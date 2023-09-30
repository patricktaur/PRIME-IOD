import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';

import { debounceTime } from 'rxjs/operators';
import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { CdsPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-pagination-and-filters';

import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

@Component({
  selector: 'app-cds-development-filter',
  templateUrl: './cds-development-filter.component.html',
  styleUrls: ['./cds-development-filter.component.css']
})
export class CdsDevelopmentFilterComponent implements OnInit, OnDestroy {
  // @Input() requiredPermissions: any;
  // @Input() selectedFilters: any;

  @Input() selectedFilters: CdsDevpPaginationAndFilters = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: '',
    sortOn: 'task-id',
    sortBy: 'asc',
    searchText: '',
    // textSearchField: '',
    // textSearch: '',
    region: [],
    portfolio: [],
    sponsor: [],
    cdms: [],
    dmpm: [],
    requestor: [],
    cDSAssignedTo: [],
    clinicalDataDeliveryLead: [],
    validationProgrammer: [],
    taskCategory: [],
    taskSubCategory: [],
    dueDateFrom: null,
    dueDateTo: null,
    status: [],
    priority: 'no',
    completed: 'no',
    type: ''
  };

  @Input() showResetButton: boolean = false;

  @Output() filterChange = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  // resourceDisabled: boolean = false;
  currentUserId: string | undefined;

  filterSub: Subscription | undefined;
  loadSub: Subscription | undefined;
  constructor(
    private credentialsService: CredentialsService,
    private sharedCompsService: SharedCompsService,
    private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;

    // if (!this.credentialsService.userHasPermission(this.requiredPermissions.resource)) {
    //   this.resourceDisabled = true;
    // }

    /*
  
    
    */

    this.loadFilters();

    this.onFiltersChange();
    this.filterSub = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.searchText = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.loadSub = this.cdsTrackersService.getCdsDevelopmentTrackerFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;

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

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
    this.filterSub?.unsubscribe();
  }
}
