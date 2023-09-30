import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

import { debounceTime } from 'rxjs/operators';
import { ImiRaTrackersService } from '@app/prism/imi-ra-trackers/imi-ra-trackers.service';
import { ImiRaOutputPaginationAndFilters } from '@app/prism/imi-ra-trackers/imi-ra-output-req-group/imi-ra-output-pagination-and-filters';

@Component({
  selector: 'app-imi-ra-output-req-filters',
  templateUrl: './imi-ra-output-req-filters.component.html',
  styleUrls: ['./imi-ra-output-req-filters.component.css']
})
export class ImiRaOutputReqFiltersComponent implements OnInit, OnDestroy {
  @Input() selectedFilters: ImiRaOutputPaginationAndFilters = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: 'task-id',
    sortOn: 'task-id',
    sortBy: 'asc',
    searchText: '',
    sponsor: [],
    outputType: [],
    requestedPriority: [],
    outputStatus: [],
    requestor: [],
    requestedDueDateFrom: null,
    requestedDueDateTo: null,
    developerAssigned: []
  };

  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  // resourceDisabled: boolean = false;
  currentUserId: string = '';

  filterSub: Subscription | undefined;
  loadSub: Subscription | undefined;
  constructor(
    private credentialsService: CredentialsService,
    private sharedCompsService: SharedCompsService,
    private imiRaTrackersService: ImiRaTrackersService
  ) {}

  ngOnInit(): void {
    if(this.credentialsService.currentUser.id) {
      this.currentUserId = this.credentialsService.currentUser.id;
    }

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
    this.loadSub = this.imiRaTrackersService.getImiRaOutputFilters().subscribe(
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

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
    this.filterSub?.unsubscribe();
  }
}
