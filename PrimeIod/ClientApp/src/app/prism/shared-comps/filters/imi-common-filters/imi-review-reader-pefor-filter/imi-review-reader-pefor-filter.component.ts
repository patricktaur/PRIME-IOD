import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import { CdmsTrackerPaginationAndFilters } from '@app/prism/shared-comps/filters/cdms/cdms-tracker-pagination-and-filters';
import { ImiReviewReaderPerforPaginationAndFilters } from '@app/prism/shared-comps/filters/imi-common-filters/imi-review-reader-perfor-pagination-filter';
@Component({
  selector: 'app-imi-review-reader-pefor-filter',
  templateUrl: './imi-review-reader-pefor-filter.component.html',
  styleUrls: ['./imi-review-reader-pefor-filter.component.css']
})
export class ImiReviewReaderPeforFilterComponent implements OnInit, OnDestroy {
  @Input() selectedFilters: ImiReviewReaderPerforPaginationAndFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    sponsor: [],
    status: [],
    reviewedByProjectManagers: [],
    reviewedByProjectDirectors: [],
    watchList: null,
    escalated: null
  };

  /*
pageNumber: number;
  pageSize: number;
  iconNumberOrName: string;
  sponsor: string[];
  region: string[];
  reviewedByProjectManagers: string[];
  reviewedByProjectDirectors: [];
  watchList: '';
  escalated: '';
  */

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
    this.sharedCompsService.getImiReviewPerFilters().subscribe(
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
