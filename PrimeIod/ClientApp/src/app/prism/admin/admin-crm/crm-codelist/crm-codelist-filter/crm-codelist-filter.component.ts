import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CredentialsService } from '@app/core';
import { CrmCodelistService } from '../crm-codelist.service';
import { CrmCodelistFilterService } from '../crm-codelist-filter.service';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-crm-codelist-filter',
  templateUrl: './crm-codelist-filter.component.html',
  styleUrls: ['./crm-codelist-filter.component.css']
})
export class CrmCodelistFilterComponent {
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
    private crmCodelistService: CrmCodelistService, // private cdsTrackersService: CDSTrackersService
    private crmCodelistFilterService: CrmCodelistFilterService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;
    this.loadFilters();

    this.crmCodelistFilterService.filters.subscribe((filters:any) => {
      if(filters) {
        // console.log(`filters length is 0`);
        this.selectedFilters = filters;
      } 
    })

    // this.onFiltersChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.crmCodelistService.codeListParIdNames().subscribe(
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
