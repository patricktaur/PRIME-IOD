import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { TblStudyService } from '@app/prism/study-group/tbl-study/tbl-study.service';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import {
  GuiCellView,
  GuiColumn,
  GuiColumnMenu,
  GuiDataType,
  GuiPaging,
  GuiPagingDisplay,
  GuiRowColoring
} from '@generic-ui/ngx-grid';
@Component({
  selector: 'app-report-shell',
  templateUrl: './report-shell.component.html',
  styleUrls: ['./report-shell.component.css']
})
export class ReportShellComponent implements OnInit {
  @Input() title: string | undefined;
  records: any;
  report: any;
  gridProperties: any;
  columns: Array<GuiColumn> = [];
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    // private tblStudyService: TblStudyService,
    private studyReportService: StudyReportService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.report = params.report;

      this.loadReport();
      this.loadUIGridProperties();
      console.log('Report: ' + this.report);
    });

    // this.route.queryParams
    //   .filter(params => params.order)
    //   .subscribe(params => {
    //     console.log(params); // { order: "popular" }

    //     this.order = params.order;
    //     console.log(this.order); // popular
    // }
  }

  loadUIGridProperties() {
    // this.isLoading = true;

    // this.tblStudyService.getTblStudyList().subscribe(
    this.studyReportService.getStudyReportUIGrid(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.gridProperties = res;
          this.title = this.gridProperties.title;
          this.columns = this.gridProperties.columns;
          // console.log('Grid properties loaded');
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadReport() {
    this.isLoading = true;

    // this.tblStudyService.getTblStudyList().subscribe(
    this.studyReportService.getStudyReport(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          console.log('Records loaded');
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // columns: Array<GuiColumn> = [
  //   {
  //     header: 'Icon Number',
  //     field: 'studyIconNumber',
  //     type: GuiDataType.STRING,
  //     view: GuiCellView.TEXT
  //   },
  //   {
  //     header: 'Study Name',
  //     field: 'studyName' //source {type: 'clothes'}
  //   },
  //   {
  //     header: 'Sponsor',
  //     field: 'sponsor' //source {price: '15$'}
  //   },
  //   {
  //     header: 'Status',
  //     field: 'statusText' //source {price: '15$'}
  //   },
  //   {
  //     header: 'Overall Project Score',
  //     field: 'overallProjectScore' //source {price: '15$'}
  //   },
  //   {
  //     header: 'Alerts',
  //     field: 'alerts' //source {price: '15$'}
  //   }
  // ];
}
