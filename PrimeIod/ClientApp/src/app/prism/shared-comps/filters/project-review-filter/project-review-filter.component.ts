import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
// import { StudyFilters } from '@app/prism/shared-comps/filters/study-filters';
import { ProjectReviewFilters } from '@app/prism/shared-comps/filters/project-review-filters';

@Component({
  selector: 'app-project-review-filter-a',
  templateUrl: './project-review-filter.component.html',
  styleUrls: ['./project-review-filter.component.css']
})
export class ProjectReviewFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter<any>();

  filterForm: FormControl = new FormControl('');

  filters: any;
  regionFilters: string[] = [];
  portfolioFilters: any;
  cdmsFilters: any;
  dmpmsFilters: any;
  dmpmManagerFilters: any;

  statusFilters: any;
  sponsorFilters: any;

  specialProjectFilters: any;

  frequencyFilters: any;

  studyTypeFilters: any;

  watchlistFilters: any;

  reviewCycleFilters: any;

  filt: ProjectReviewFilters = {
    iconNumberOrName: '',
    cdms: '',
    region: '',
    portfolio: '',
    dmpm: '',
    dmpmManager: '',
    status: '',
    sponsor: '',
    specialProject: '',
    frequency: '',
    studyType: '',
    watchList: '',
    reviewCycle: ''
  };

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();

    this.filterForm.valueChanges.subscribe(val => {
      this.onSearchTextChange();
    });
  }

  loadFilters() {
    // this.isLoading = true;
    // this.filterValues.pageNo = this.pageNumber;
    // this.filterValues.pageSize = this.pageSize;

    this.sharedCompsService.getDMFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.totalItems = res.recordCount;
          this.filters = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onFiltersChange() {
    this.filterChange.emit(this.filt);
  }

  onSearchTextChange() {
    this.filt.iconNumberOrName = this.filterForm.value;
    this.onFiltersChange();
    this.searchTextChange.emit(this.filterForm.value);
  }
}
