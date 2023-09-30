import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { CredentialsService } from '@app/core/authentication/credentials.service';

// import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
// import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';

import { debounceTime } from 'rxjs/operators';
import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';

@Component({
  selector: 'app-study-cds-development-task-requests-filters',
  templateUrl: './study-cds-development-task-requests-filters.component.html',
  styleUrls: ['./study-cds-development-task-requests-filters.component.css']
})
export class StudyCdsDevelopmentTaskRequestsFiltersComponent implements OnInit {
  @Input() requiredPermissions: any;
  @Input() selectedFilters: any;

  @Output() filterChange = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<any>();

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  constructor(
    // private credentialsService: CredentialsService,
    // private sharedCompsService: SharedCompsService,
    private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    this.loadFilters();

    this.onFiltersChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      //this.filt.iconNumberOrName = data;

      // this.selectedFilters.iconNumberOrName = data;
      // this.onFiltersChange();
      this.selectedFilters.searchText = data;
      this.onFiltersChange();
    });
  }
  loadFilters() {
    this.cdsTrackersService.getCdsDevelopmentTrackerFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;

          // //the default user-id is removed if dmResource - does not contain the user in the list
          // //
          // let itemInList = this.hasResourceInList(this.filters.dmResources, this.currentUserId);
          // if (!itemInList) {
          //   this.selectedFilters.resource = [];
          // }

          this.onFiltersChange();
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

  resetFiltersClicked() {
    this.resetFilters.emit(true);
  }
}
