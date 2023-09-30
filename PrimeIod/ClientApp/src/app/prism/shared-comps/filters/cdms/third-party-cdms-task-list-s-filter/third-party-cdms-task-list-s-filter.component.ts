import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CdmsTrackerPaginationAndFilters } from '@app/prism/shared-comps/filters/cdms/cdms-tracker-pagination-and-filters';

@Component({
  selector: 'app-third-party-cdms-task-list-s-filter',
  templateUrl: './third-party-cdms-task-list-s-filter.component.html',
  styleUrls: ['./third-party-cdms-task-list-s-filter.component.css']
})
export class ThirdPartyCdmsTaskListSFilterComponent implements OnInit {
  @Input() selectedFilters: CdmsTrackerPaginationAndFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    dmpm: [],
    region: [],
    cdms: [],
    taskGroupTitle: [],
    task: [],
    taskStatus: [],
    itemStatus: []
  };

  @Output() filterChange = new EventEmitter<any>();

  filterForm = new FormControl('');
  obs: Subscription | undefined;
  filters: any;
  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();

    this.obs = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.sharedCompsService.getThirdPartyCdmsTaskListFilters().subscribe(
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

  ngOnDestroy() {
    this.obs?.unsubscribe();
  }
}
