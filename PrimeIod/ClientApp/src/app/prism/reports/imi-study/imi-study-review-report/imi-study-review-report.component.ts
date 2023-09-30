import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
// import { FormControl } from '@angular/forms';
// import { Observable, of, Subscription } from 'rxjs';

// import { CredentialsService } from '@app/core/authentication/credentials.service';

// import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
import { ImiReviewReportFilters } from '@app/prism/reports/imi-study/filters/imi-review-report-filters';

// import { PrismHomeService } from '@app/prism/prism-home/prism-home.service';
import { ImiStudyReportService } from '@app/prism/reports/imi-study/imi-study-report.service';

import { UIGridColumn } from '@app/shared/common/ui-grid-column';
// import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-study-review-report',
  templateUrl: './imi-study-review-report.component.html',
  styleUrls: ['./imi-study-review-report.component.css']
})
export class ImiStudyReviewReportComponent implements OnInit, OnDestroy {
  isLoading = true;
  title = 'IMI Review Report';
  selectedFilters: ImiReviewReportFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    region: [],
    sort: 'asc',
    portfolio: [],
    cdms: [],
    dmpm: [],
    dmpmManager: [],
    status: [],
    sponsor: [],
    specialProject: [],
    studyType: [],
    resource: []
  };

  // api/${this.report}/download-csv-s
  downloadApiPath = 'api/vwIMIStudyReviewV2/download-csv-s';
  csvfileName = 'IMI Study Review.csv';
  columns: Array<UIGridColumn>[] = [];
  records: any = [];
  recordCount: number = 0;

  loadSub: Subscription | undefined;
  constructor(private service: ImiStudyReportService) {}

  ngOnInit(): void {
    this.loadColumns();
    this.loadReport();
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }

  loadColumns() {
    this.service.getReportColumns().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.columns = res.columns;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  loadReport() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.service.getImiStudyReport(this.selectedFilters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res.records;
          this.recordCount = res.recordCount;
          // this.filteredRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(filters: ImiReviewReportFilters) {
    this.selectedFilters = filters;

    this.loadReport();
  }

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }

  onCommentCheckChange(value: boolean) {
    let filtered = this.columns.filter((x: any) => x.hideGroup == 'comment');
    filtered.forEach((e: any) => {
      e.hide = !value;
    });
  }

  onActionCheckChange(value: boolean) {
    let filtered = this.columns.filter((x: any) => x.hideGroup == 'action');
    filtered.forEach((e: any) => {
      e.hide = !value;
    });
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  // columns: Array<UIGridColumn> = [
  //   {
  //     header: 'Icon Number',
  //     field: 'studyIconNumber'
  //   },
  //   {
  //     header: 'Project Review',
  //     field: 'reviewIndex',
  //     align: 'right'
  //   },
  //   {
  //     header: 'Study Name',
  //     field: 'studyName',
  //     width: 100 //source {type: 'clothes'}
  //   },

  //   {
  //     header: 'Region',
  //     field: 'region',
  //     width: 100
  //   },
  //   {
  //     header: 'Portfolio',
  //     field: 'portfolio',
  //     width: 100
  //   },

  //   {
  //     header: 'Sponsor',
  //     field: 'sponsor',
  //     width: 100
  //   },

  //   {
  //     header: 'CDMS',
  //     field: 'cdms',
  //     width: 100
  //   },
  //   {
  //     header: 'IMI PM',
  //     field: 'currentPm',
  //     width: 100
  //   },
  //   {
  //     header: 'Status',
  //     field: 'studyStatus'
  //   },
  //   {
  //     header: 'IMI Involvement Begins',
  //     field: 'imiInvolvementBegins',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   },
  //   {
  //     header: 'FPI',
  //     field: 'firstPatientIn',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   },
  //   {
  //     header: 'IMI Involvement Ends',
  //     field: 'imiInvolvementEnds',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   },
  //   //FPI, MainDBL
  //   {
  //     header: 'Project Score',
  //     field: 'projectScore',
  //     align: 'center',
  //     backgroundStyle: 'one-to-five-score',
  //     width: 10
  //   }
  // ];
}
