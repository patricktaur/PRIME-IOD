import { Component, OnInit } from '@angular/core';
import { ComplianceReportService } from '@app/prism/reports/compliance/compliance-report.service';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
@Component({
  selector: 'app-compliance-offline-validation-rep',
  templateUrl: './compliance-offline-validation-rep.component.html',
  styleUrls: ['./compliance-offline-validation-rep.component.css']
})
export class ComplianceOfflineValidationRepComponent implements OnInit {
  title: any;
  isLoading: boolean = false;
  test: any;
  studyIds: number[] = [];
  sutydIdChunks: number[][] = [];
  records: any = [];
  filteredRecords: any = [];

  report: any;
  gridProperties: any;
  columns: any;
  pageNumber = 1;
  pageSize = 10;

  filterGroup: number = 0;

  loadCounter: number = 0;

  requestedStudyCount: number = 0;

  constructor(
    private complianceReportService: ComplianceReportService,
    private studyReportService: StudyReportService
  ) {}

  ngOnInit(): void {
    this.report = 'vwComplianceOfflineValidationsRepV2';
    this.loadReportIdsChunk();
    this.loadUIGridProperties();
  }

  loadUIGridProperties() {
    this.isLoading = true;
    this.title = 'Loading ...';
    this.columns = null;
    this.studyReportService.getReportUIGrid(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.gridProperties = res;
          this.title = this.gridProperties.title;
          this.columns = this.gridProperties.columns;
          this.filterGroup = this.gridProperties.filterGroup;
          // console.log('this.filterGroup a:' + this.filterGroup);
          // console.log('Grid properties loaded');
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadReportIdsChunk() {
    this.complianceReportService.getOfflineValidationsRepStudyIdChunks().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.test = res;
          this.sutydIdChunks = res;
          this.loadReportByStudyIds(this.sutydIdChunks);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  loadReportByStudyIds(studyIdChunks: number[][]) {
    studyIdChunks.forEach(ele => {
      this.getReportByStudyIds(ele);
      // setTimeout(()=>{

      // }, 4000);
    });
  }

  getReportByStudyIds(studyIds: number[]): any {
    this.isLoading = true;

    this.complianceReportService.getOfflineValidationsRepByStudyIds(studyIds).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.requestedStudyCount += studyIds.length;
          this.loadCounter += 1;
          this.records.push(...res);
          this.filteredRecords.push(...res);
          this.isLoading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  get totalStudies(): number {
    const totalProducts = this.sutydIdChunks.reduce((count, current) => count + current.length, 0);
    return totalProducts;
  }

  get sortedRecords(): any {
    //testsSortedByCognome = tests.sort((a, b) => (a.cognome < b.cognome ? -1 : 1));
    return this.filteredRecords.sort((a: any, b: any) => (a.studyIconNumber < b.studyIconNumber ? -1 : 1));
    // return null;
  }

  get csvfileName() {
    let recOf = '';
    if (this.filteredRecords && this.filteredRecords.length > 0) {
      if (this.filteredRecords.length == this.records.length) {
        recOf = 'All-Of-' + this.records.length;
      } else {
        recOf = this.filteredRecords.length + '-Of-' + this.records.length;
      }
    }
    return this.title + '-' + recOf + '-records.csv';
  }

  onFilteredRecordsChange(filteredRecords: any) {
    this.filteredRecords = filteredRecords;
  }
  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }
}
