import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadChildren, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSCodingReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-req.service';

@Component({
  selector: 'app-tudy-cds-coding-task-history',
  templateUrl: './tudy-cds-coding-task-history.component.html',
  styleUrls: ['./tudy-cds-coding-task-history.component.css']
})
export class TudyCdsCodingTaskHistoryComponent implements OnInit {
  loading: any;
  id: number = 0;
  stateObj: any;
  testObj: any;
  records: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: StudyCDSCodingReqService // private requestIdService: StudyCdsDevTaskRequestIdService
  ) {}

  ngOnInit(): void {
    // this.stateObj = this.location.getState();
    // this.id = this.stateObj.id;
    // if (this.id > 0) {
    //   this.loadRecord(this.id);
    // }

   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
    }
    this.loadRecord(this.id);
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getHistoryList(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.records = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }

  backgroundStyleOnChange = {
    'background-color': '#f2eb1d',
    // 'text-align': 'center',
    // 'vertical-align': 'middle',
    'font-weight': 'bold',
    padding: '5px',
    color: 'black',
    'border-radius': '5px'
  };

  columns: Array<any> = [
    {
      header: 'History',
      field: 'versionNumber',
      align: 'right'
    },
    {
      header: 'History Date',
      field: 'updatedOn', //?? where is historyDate
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Created Date',
      field: 'createdOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Coding Category',
      field: 'codingTaskCategoryPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Coding Detail',
      field: 'codingTaskDetail',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Coding Priority',
      field: 'codingPriorityPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      //todo: in DTO
      header: 'Recurring Frequency',
      field: 'recurringFrequencyPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Due Date',
      field: 'dueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Completed Date',
      field: 'completedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Completed By',
      field: 'completedByDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Requestor',
      field: 'requestorDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Requestor',
      field: 'requestorDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Link to Task Instruction',
      field: 'linkToDocumentation',
      width: 100,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Comments',
      field: 'comments',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Last Saved By',
      field: 'updatedByDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    }
  ];
}
