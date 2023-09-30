import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core';
import { debounceTime } from 'rxjs/operators';
import { CrmProjectGovernanceCodelistService } from '../crm-project-governance-codelist.service';
import { CrmProjectGovernanceCodelistFilterService } from '../crm-project-governance-codelist-filter.service';

@Component({
  selector: 'app-crm-project-governance-codelist-filter',
  templateUrl: './crm-project-governance-codelist-filter.component.html',
  styleUrls: ['./crm-project-governance-codelist-filter.component.css']
})
export class CrmProjectGovernanceCodelistFilterComponent {
  @Input() selectedFilters: any = {};
  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any = [];

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string | undefined = "";

  constructor(
    private credentialsService: CredentialsService,
    private crmProjectGovernanceCodelistService: CrmProjectGovernanceCodelistService, // private cdsTrackersService: CDSTrackersService
    private crmProjectGovernanceCodelistFilterService: CrmProjectGovernanceCodelistFilterService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;
    this.loadFilters();

    this.crmProjectGovernanceCodelistFilterService.filters.subscribe((filters:any) => {
      if(filters) {
        // console.log(`filters length is 0`);
        this.selectedFilters = filters;
      } 
    })

    // this.onFiltersChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.crmProjectGovernanceCodelistService.codeListParIdNames().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;
          if(this.filters.length > 0 && this.selectedFilters.parId == null) {
            this.selectedFilters.parId = res[0].recId;
            this.onFiltersChange();
          }
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  hasResourceInList(resources: any, resourceId: string) {
    var result = resources.filter((obj: any) => {
      return obj.id === resourceId;
    });
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
    // return result ? true : false;
  }

  onFiltersChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}
