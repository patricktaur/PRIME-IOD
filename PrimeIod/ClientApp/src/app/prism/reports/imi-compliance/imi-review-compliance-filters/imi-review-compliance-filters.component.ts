import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import { CdmsTrackerPaginationAndFilters } from '@app/prism/shared-comps/filters/cdms/cdms-tracker-pagination-and-filters';
import { ImiReviewReaderPerforPaginationAndFilters } from '@app/prism/shared-comps/filters/imi-common-filters/imi-review-reader-perfor-pagination-filter';
import { ImiComplianceReportService } from '@app/prism/reports/imi-compliance/imi-compliance-report.service';

@Component({
  selector: 'app-imi-review-compliance-filters',
  templateUrl: './imi-review-compliance-filters.component.html',
  styleUrls: ['./imi-review-compliance-filters.component.css']
})
export class ImiReviewComplianceFiltersComponent implements OnInit, OnDestroy {
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
  isCommentsChecked: boolean = false;
  isActionsChecked: boolean = false;

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
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter<any>();

  // @Output() commentsCheckChanged = new EventEmitter<any>();
  // @Output() actionCheckChanged = new EventEmitter<any>();

  filterForm : FormControl = new FormControl('');
  obs: Subscription | undefined;
  filters: any;

  sponsorsFilters: string[] = [];
  portfolioFilters: string[] = [];
  reviewCycleFilters: string[] = [];
  lastReviewedByFilters: string[] = [];
  projectManagersFilters: string[] = [];
  projectDirectorFilters: string[] = [];

  constructor(private filterService: ImiComplianceReportService) {}

  ngOnInit(): void {
    this.loadFilters();

    this.obs = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.filterService.getReviewComplianceFilters().subscribe(
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
    this.filterChange.emit(this.filteredRecords);
  }

  get filteredRecords() {
    let studyNameLower = '';
    studyNameLower = this.filterForm.value;
    studyNameLower = studyNameLower.toLowerCase();
    let filter1 = this.records;
    if (this.filterForm.value.length > 0) {
      filter1 = null;
      filter1 = this.records.filter(
        (x: any) =>
          x.studyIconNumber
            .toString()
            .toLowerCase()
            .indexOf(this.filterForm.value) != -1 ||
          x.studyName
            .toString()
            .toLowerCase()
            .indexOf(studyNameLower) != -1
      );
    }

    let filter2 = filter1;
    if (this.sponsorsFilters && this.sponsorsFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.sponsorsFilters.indexOf(n.sponsor) != -1);
    }

    let filter3 = filter2;
    if (this.portfolioFilters && this.portfolioFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.portfolioFilters.indexOf(n.portfolio) != -1);
    }

    let filter4 = filter3;
    if (this.reviewCycleFilters && this.reviewCycleFilters.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.reviewCycleFilters.indexOf(n.studyReviewCyclePid) != -1);
    }

    let filter5 = filter4;
    if (this.lastReviewedByFilters && this.lastReviewedByFilters.length > 0) {
      filter5 = null;
      filter5 = filter4.filter((n: any) => this.lastReviewedByFilters.indexOf(n.studyReviewLastReviewedBy) != -1);
    }

    //   projectManagersFilters: string[];
    // projectDirectorFilters: string[];
    // "currentPm": " Aaron Collins - IMI PM| Aaron Gallegos - IMI PD", "currentPmPd": "

    let filter6 = filter5;
    if (this.projectManagersFilters && this.projectManagersFilters.length > 0) {
      filter6 = null;
      // filter6 = filter5.filter((n: any) => this.projectManagersFilters.indexOf(n.currentPm) != -1);
      filter6 = filter5.filter((n: any) => this.projectManagersFilters.some((v: any) => n.currentPm?.includes(v)));
    }
    //      filter5 = filter4.filter((n: any) => this.dmpmsFilters.some((v: any) => n.currentDmpm?.includes(v)));

    let filter7 = filter6;
    if (this.projectDirectorFilters && this.projectDirectorFilters.length > 0) {
      filter7 = null;
      // filter7 = filter6.filter((n: any) => this.projectDirectorFilters.indexOf(n.currentPmPd) != -1);
      filter7 = filter6.filter((n: any) => this.projectDirectorFilters.some((v: any) => n.currentPmPd?.includes(v)));
    }

    return filter7;
  }

  ngOnDestroy() {
    this.obs?.unsubscribe();
  }
}
