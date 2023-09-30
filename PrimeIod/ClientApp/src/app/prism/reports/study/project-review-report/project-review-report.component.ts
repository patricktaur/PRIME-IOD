import { Component, OnInit } from '@angular/core';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
// import { StudyFilters } from '@app/prism/shared-comps/filters/study-filters';
import { ProjectReviewFilters } from '@app/prism/shared-comps/filters/project-review-filters';
import { StudyFiltersService } from '@app/prism/shared-comps/filters/study-filters.service';
@Component({
  selector: 'app-project-review-report',
  templateUrl: './project-review-report.component.html',
  styleUrls: ['./project-review-report.component.css']
})
export class ProjectReviewReportComponent implements OnInit {
  title = 'Project Review Report';
  filteredRecords: any;

  filters: ProjectReviewFilters = {
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

  pageNumber = 1;
  pageSize = 10;

  columns: any;
  projectReviewRecords: any;
  projectCurrentReviewRecords: any;

  constructor(private studyReportService: StudyReportService, private studyFilterService: StudyFiltersService) {}

  ngOnInit(): void {
    this.loadColumns();
    this.loadProjectReviewReport();
    this.loadProjectCurrentReviewReport();
  }

  onFilterOneChange(filters: any) {
    this.filters = filters;
  }

  loadColumns() {
    this.studyReportService.getProjectReviewColumns().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.columns = res.columns;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  loadProjectReviewReport() {
    // this.isLoading = true;
    this.studyReportService.getProjectReviewReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.projectReviewRecords = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  loadProjectCurrentReviewReport() {
    // this.isLoading = true;
    this.studyReportService.getProjectCurrentReviewReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.projectCurrentReviewRecords = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  get filteredReviewRecords() {
    const filter1Records = this.studyFilterService.getFilteredRecords(this.projectReviewRecords, this.filters);
    return this.projReviewfilteredRecords(filter1Records, this.filters);
    // return this.studyFilterService.getFilteredRecords(this.projectReviewRecords, this.filters);
  }

  get filteredCurrentReviewRecords() {
    const filter1Records = this.studyFilterService.getFilteredRecords(this.projectCurrentReviewRecords, this.filters);
    return this.projReviewfilteredRecords(filter1Records, this.filters);
    // return this.studyFilterService.getFilteredRecords(this.projectCurrentReviewRecords, this.filters);
  }

  get currentReviewsCount() {
    return this.filteredCurrentReviewRecords?.length;
  }

  get ReviewsCount() {
    return this.filteredReviewRecords?.length;
  }

  projReviewfilteredRecords(records: any, filter: ProjectReviewFilters) {
    let filter1 = records;
    if (filter.watchList && filter.watchList.length > 0) {
      filter1 = null;
      filter1 = records.filter((n: any) => filter.watchList.indexOf(n.watchlist?.toLowerCase()) != -1);
    }

    let filter2 = filter1;
    if (filter.reviewCycle && filter.reviewCycle.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => filter.reviewCycle.indexOf(n.reviewCycleDesc) != -1);
    }
    return filter2;
  }
}
