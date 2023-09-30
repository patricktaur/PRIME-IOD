import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { CrmAnalysisPlanningEditService } from '@app/prism/crm/crm-tabs/crm-analysis-planning.service';
import {report1filter} from '@app/prism/reports/crm/report1/report1-filter'
import { StudyReportService } from '@app/prism/reports/study/study-report.service';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {

  title: any;
  isLoading: boolean = false;

  records: any = [];
  filteredRecords: any = [];
  selectedFilters: report1filter = {
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

  

  // reportColumns: Array<any> = [
  //   {
  //     header: 'ICON Number',
  //     field: 'iconNumber'
  //   },
  //   {
  //     header: 'Activity',
  //     field: 'activity'
  //   },
  //   {
  //     header: 'Central Monitoring Status',
  //     field: 'centralMonitoringStatus'
  //   },
  //   {
  //     header:'CDA/CM (As per CRM Description page)',
  //     field:'cdaCm'
  //   },
  //   {
  //     header:'First analysis Date',
  //     field:'firstAnalysisDate',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy'
  //   },
  //   {
  //     header:'Final Analysis Date',
  //     field:'finalAnalysisDate',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy'
      
  //   },
  //   {
  //     header:'Jan Forcast',
  //     field:'janforcast'
  //   },
  //   {
  //     header:'Jan Actual',
  //     field:'janactual'
  //   },
  //   {
  //     header:'Feb Forcast',
  //     field:'febforcast'
  //   }
  //   ,
  //   {
  //     header:'Feb Forcast',
  //     field:'febactual'
  //   },
  //   {
  //     header:'Mar Forcast',
  //     field:'marforcast'
  //   }
  //   ,
  //   {
  //     header:'Mar Forcast',
  //     field:'maractual'
  //   },
  //   {
  //     header:'Apr Forcast',
  //     field:'aprforcast'
  //   }
  //   ,
  //   {
  //     header:'Apr Forcast',
  //     field:'apractual'
  //   }
  //   ,
  //   {
  //     header:'May Forcast',
  //     field:'mayforcast'
  //   }
  //   ,
  //   {
  //     header:'May Forcast',
  //     field:'mayactual'
  //   }
  //   ,
  //   {
  //     header:'Jun Forcast',
  //     field:'junforcast'
  //   }
  //   ,
  //   {
  //     header:'Jun Forcast',
  //     field:'junactual'
  //   }
  //   ,
  //   {
  //     header:'Jul Forcast',
  //     field:'julforcast'
  //   }
  //   ,
  //   {
  //     header:'Jul Forcast',
  //     field:'julactual'
  //   }
  //   ,
  //   {
  //     header:'Aug Forcast',
  //     field:'augforcast'
  //   }
  //   ,
  //   {
  //     header:'Aug Forcast',
  //     field:'augactual'
  //   }
  //   ,
  //   {
  //     header:'Sep Forcast',
  //     field:'sepforcast'
  //   }
  //   ,
  //   {
  //     header:'Sep Forcast',
  //     field:'sepactual'
  //   }
  //   ,
  //   {
  //     header:'Oct Forcast',
  //     field:'octforcase'
  //   }
  //   ,
  //   {
  //     header:'Oct Forcast',
  //     field:'octactual'
  //   }
  //   ,
  //   {
  //     header:'Nov Forcast',
  //     field:'novforcast'
  //   }
  //   ,
  //   {
  //     header:'Nov Forcast',
  //     field:'novactual'
  //   }
  //   ,
  //   {
  //     header:'Dec Forcast',
  //     field:'decforcast'
  //   }
  //   ,
  //   {
  //     header:'Dec Forcast',
  //     field:'decactual'
  //   }
  // ];

  
  LoadReportData(selectedFilters:any) {
    this.isLoading = true;
    this.title = 'Loading ...';
    this.columns = null;
    this.loadSubscription = this.crmAnalysisPlanningEditService.getall(selectedFilters).subscribe(
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
    this.title = 'CRM Report 1';
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
