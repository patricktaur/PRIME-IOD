import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import {SharedCompsService} from '@app/prism/shared-comps/shared-comps.service'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-study-resources',
  templateUrl: './study-resources.component.html',
  styleUrls: ['./study-resources.component.css']
})
export class StudyResourcesComponent implements OnInit, OnChanges, OnDestroy {
  isLoading = false;
  @Input('userId') userId!: number | null;

  records: any;

  pageNumber = 1;
  pageSize = 10;

  loadRecordSub: Subscription | undefined;
  filterForm = new FormControl('');

  constructor(
    private httpService: SharedCompsService,
  ) {}

  ngOnInit(): void {
    
    if (this.userId){
      this.loadRecord(this.userId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.loadRecord(this.userId);
    }
  }
  
  loadRecord(userId : number | null) {
    // userId = 1;
    if (!userId){
      this.records = [];
      return;
    }
    this.isLoading = true;
    this.loadRecordSub = this.httpService.getUserStudyResources(userId).subscribe(
      
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          this.isLoading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onPageChange(pageOptions: any) {
    this.pageNumber = pageOptions.page;
    this.pageSize = pageOptions.pageSize;
    
  }

  get filteredRecords() {
    let iconNumberOrRole: any = '';

    iconNumberOrRole = this.filterForm.value?.toLowerCase();
    iconNumberOrRole = iconNumberOrRole.toLowerCase();

    let filter1 = this.records;
    if (iconNumberOrRole.length > 0) {
      filter1 = null;
      filter1 = this.records.filter(
        (x: any) =>
          x.studyIconNumber
            ?.toString()
            .toLowerCase()
            .indexOf(iconNumberOrRole) != -1 ||
          x.rolePDescription
            ?.toString()
            .toLowerCase()
            .indexOf(iconNumberOrRole) != -1
      );
    }

    return filter1;
  }


  /*
records: [ { "rolePDescription": "DMPM", 
"studyFirstIconNumber": "0310",
 "studySecondIconNumber": "1800", 
 "studyIconNumber": "0310/1800", 
 "startDate": "2014-11-26T19:14:00", "stopDate": null, "studyResourceStartDate": "2014-11-26T19:14:00", "studyResourceStopDate": null }, { "rolePDescription": "DMPM", "studyFirstIconNumber": "0113", "studySecondIconNumber": "1000", "studyIconNumber": "0113/1000", "startDate": "2015-11-20T00:00:00", "stopDate": null, "studyResourceStartDate": "2015-11-20T00:00:00", "studyResourceStopDate": null } ]
  */

  columns: Array<any> = [
    
    {
      header: 'Study Icon Number',
      field: 'studyIconNumber'
    },
    {
      header: 'Role',
      field: 'rolePDescription',
      width : 30
    },
    {
      header: 'Start Date',
      field: 'startDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
      
    },
    {
      header: 'Stop Date',
      field: 'stopDate',type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
      
    },
    
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }

}
