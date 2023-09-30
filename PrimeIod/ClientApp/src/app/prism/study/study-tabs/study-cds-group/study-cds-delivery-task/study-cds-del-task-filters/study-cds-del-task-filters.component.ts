import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';

import { debounceTime } from 'rxjs/operators';
import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';

@Component({
  selector: 'app-study-cds-del-task-filters',
  templateUrl: './study-cds-del-task-filters.component.html',
  styleUrls: ['./study-cds-del-task-filters.component.css']
})
export class StudyCdsDelTaskFiltersComponent implements OnInit, OnDestroy {
  @Input() requiredPermissions: any;
  @Input() selectedFilters: any;

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
  constructor(private cdsTrackersService: CDSTrackersService) {}

  ngOnInit(): void {
    this.loadFilters();

    this.onFiltersChange();
    this.filterSub = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      //this.filt.iconNumberOrName = data;

      // this.selectedFilters.iconNumberOrName = data;
      // this.onFiltersChange();
      this.selectedFilters.searchText = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.loadSub = this.cdsTrackersService.getCdsDeliveryTrackerFilters().subscribe(
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
