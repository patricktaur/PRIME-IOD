import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';

@Component({
  selector: 'app-study-cds-inst-task-filters',
  templateUrl: './study-cds-inst-task-filters.component.html',
  styleUrls: ['./study-cds-inst-task-filters.component.css']
})
export class StudyCdsInstTaskFiltersComponent implements OnInit, OnDestroy {
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
    this.loadSub = this.cdsTrackersService.getCdsInstructionTrackerFilters().subscribe(
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
