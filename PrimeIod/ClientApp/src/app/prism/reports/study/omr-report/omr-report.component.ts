import { Component, OnInit } from '@angular/core';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { GuiColumn } from '@generic-ui/ngx-grid';

@Component({
  selector: 'app-omr-report',
  templateUrl: './omr-report.component.html',
  styleUrls: ['./omr-report.component.css']
})
export class OmrReportComponent implements OnInit {
  records: any;
  filteredRecords: any[] = [];

  isLoading: boolean = false;
  searchTerm = '';
  isDataLoaded = false;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private studyReportService: StudyReportService // private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.studyReportService.getOMRReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          if (this.records) {
            this.filteredRecords = this.records;
          }
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(filteredRecords: any) {
    this.filteredRecords = filteredRecords;
  }

  onSearchTextChange(searchText: string) {
    this.searchTerm = searchText;
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  columns: Array<any> = [
    {
      header: 'ICON Number',
      field: 'studyIconNumber'
    },
    {
      header: 'Study Name',
      field: 'studyName'
    },
    {
      header: 'Total Clean Subjects',
      field: 'totalCleanSubjects'
    },
    {
      header: '% Clean Subjects',
      field: 'percentageCleanSubject'
    },
    {
      header: 'Overall DM Score',
      field: 'overallDMScore'
    },
    {
      header: 'Data Cleaning Score',
      field: 'dataCleaningScore'
    },
    {
      header: 'External Data Score',
      field: 'externalDataScore'
    },
    {
      header: 'DB Lock Cycle Time',
      field: 'dbLockCycleTime'
    },
    {
      header: 'DB Live Prior to FPI',
      field: 'dbLivePriorToFPI',
      type: 'date'
    }
  ];
}
