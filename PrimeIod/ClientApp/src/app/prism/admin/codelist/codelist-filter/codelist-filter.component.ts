import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { CodelistService } from '@app/prism/admin/codelist/codelist.service';
import { ConsoleEventLogger } from '@generic-ui/hermes/core/infrastructure/logger/event/console.event.logger';
import { debounceTime } from 'rxjs/operators';
import { CodelistFilterService } from '../codelist-filter.service';

@Component({
  selector: 'app-codelist-filter',
  templateUrl: './codelist-filter.component.html',
  styleUrls: ['./codelist-filter.component.css']
})
export class CodelistFilterComponent implements OnInit {
  @Input() selectedFilters: any;
  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string | undefined = "";
  constructor(
    private credentialsService: CredentialsService,
    private codelistService: CodelistService, // private cdsTrackersService: CDSTrackersService,
    private codelistFilterService: CodelistFilterService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;
    this.loadFilters();
    
    this.codelistFilterService.filters.subscribe((filters:any) => {
      if(filters) {
        this.selectedFilters = filters;
      } 
    })

    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.codelistService.codeListParIdNames().subscribe(
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
