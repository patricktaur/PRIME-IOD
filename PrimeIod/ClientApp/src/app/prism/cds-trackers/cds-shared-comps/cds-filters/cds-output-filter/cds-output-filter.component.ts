import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

import { debounceTime } from 'rxjs/operators';
import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
// import { CdsDevpPaginationAndFilters } from '@app/prism/shared-comps/filters/cds/cds-devp-pagination-and-filters';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';
@Component({
  selector: 'app-cds-output-filter',
  templateUrl: './cds-output-filter.component.html',
  styleUrls: ['./cds-output-filter.component.css']
})
export class CdsOutputFilterComponent implements OnInit, OnDestroy {
  // @Input() requiredPermissions: any;
  // @Input() selectedFilters: any;
  @Input() selectedFilters: CdsOutputPaginationAndFilters = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: 'task-id',
    searchText: '',
    sortOn: 'task-id',
    sortBy: 'asc',
    // textSearchField: '',
    // textSearch: '',

    region: [],
    portfolio: [],
    sponsor: [],
    cdms: [],
    dmpm: [],
    requestor: [],
    programmerAssigned: [],
    programmingLead: [],
    taskCategory: [],
    taskSubCategory: [],
    dueDateFrom: null,
    dueDateTo: null,
    status: [],
    completed: 'no',
    dueType: ''
  };

  @Input() showResetButton: boolean = false;

  @Output() filterChange = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
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

    this.loadFilters();

    this.onFiltersChange();
    this.filterSub = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      //this.filt.iconNumberOrName = data;

      // this.selectedFilters.iconNumberOrName = data;
      // this.onFiltersChange();
      this.selectedFilters.searchText = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.loadSub = this.cdsTrackersService.getCdsOutputTrackerFilters().subscribe(
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
