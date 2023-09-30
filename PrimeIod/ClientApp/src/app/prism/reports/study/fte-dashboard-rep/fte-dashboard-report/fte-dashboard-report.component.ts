import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FteDashboardFilters } from '../fte-dashboard-filters';

import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { FteDashboardService } from '../fte-dashboard.service';

@Component({
  selector: 'app-fte-dashboard-report',
  templateUrl: './fte-dashboard-report.component.html',
  styleUrls: ['./fte-dashboard-report.component.css']
})
export class FteDashboardReportComponent implements OnInit {
  title = 'Report FTE Dashboard';
  isLoading: boolean = false;
  pageNumber = 1;
  pageSize = 50;

  csvfileName = 'fte-dashboard.csv';
  records: any;
  // filteredRecords: any;

  loadSub: Subscription | undefined;
  //var d = new Date();
  // d.setMonth(d.getMonth() - 3);

  filters: FteDashboardFilters = {
    fromYear: new Date().getFullYear(),
    fromMonth: new Date().getMonth() + 1,
    toYear: new Date(new Date().setMonth(new Date().getMonth() + 6)).getFullYear(),
    toMonth: new Date(new Date().setMonth(new Date().getMonth() + 6)).getMonth(),
    fteRoles: [],
    region: [],
    portfolio: [],
    cdms: []
  };
  constructor(private fteDashboardService: FteDashboardService) {}

  ngOnInit(): void {
    this.loadReport(this.filters);
  }
  
  loadReport(filters: any) {
    this.isLoading = true;
    this.fteDashboardService.getStudyFteDashboardReport(filters).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.status === 400) {
          return;
        } else {
          this.records = res;

          // if (this.records) {
          //   this.filteredRecords = this.records;
          // }
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(filters: any) {
    this.loadReport(filters);
    // this.filters = filters;
  }

  get columns(): any {
    if (this.records === undefined) {
      return null;
    }
    const firstRow = this.records[0];

    const colNames = Object.keys(firstRow);

    const output = colNames.map((val, index) => {
      return {
        header: val
          .split(' ')
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        //  header: val,
        field: val
      };
    });

    return output;
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }
}
