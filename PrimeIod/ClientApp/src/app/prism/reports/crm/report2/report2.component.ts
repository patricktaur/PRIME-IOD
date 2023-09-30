import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { CrmAnalysisPlanningEditService } from '@app/prism/crm/crm-tabs/crm-analysis-planning.service';
import {report2filter} from '@app/prism/reports/crm/report2/report2-filter'
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { report2Service } from '@app/prism/reports/crm/report2/report2.service';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit {

  title: any;
  isLoading: boolean = false;

  records: any = [];
  filteredRecords: any = [];
  selectedFilters: report2filter = {
    year: 2023
  };
  YearList:any=[];
  

  columns: any;
  pageNumber = 1;
  pageSize = 10;

  filterGroup: number = 0;
  loadSubscription: Subscription | undefined;

  constructor(
    private crmAnalysisPlanningEditService: CrmAnalysisPlanningEditService,
    private report2service:report2Service,
    private studyReportService: StudyReportService
  ) {}

  ngOnInit(): void {

    this.YearList = [{value: 'Year', disabled: true}];
    var current_year = new Date().getFullYear();
    for(var i = current_year - 20; i <= current_year + 20; i++){
      this.YearList.push({value: i + ''});
    }


     this.LoadReportData(this.selectedFilters);
  }
  
  LoadReportData(selectedFilters:any) {
    this.isLoading = true;
    this.title = 'Loading ...';
    this.columns = null;
    this.loadSubscription = this.report2service.getall(selectedFilters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filteredRecords = res.records;
          this.columns=res.headers.columns;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
    this.title = 'CRM Report 2';
  }


  
  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  

  onFilteredRecordsChange(filteredRecords: any) {
    this.filteredRecords = filteredRecords;
  }
  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  get csvfileName() {
    let recOf = '';
    if (this.filteredRecords && this.filteredRecords.length > 0) {
      if (this.filteredRecords.length == this.filteredRecords.length) {
        recOf = 'All-Of-' + this.filteredRecords.length;
      } else {
        recOf = this.filteredRecords.length + '-Of-' + this.filteredRecords.length;
      }
    }
    return this.title + '-' + recOf + '-records.csv';
  }

  onFiltersChange() {
    this.LoadReportData(this.selectedFilters);    
  }

}
