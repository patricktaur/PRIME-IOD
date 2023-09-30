import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadChildren, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';

@Component({
  selector: 'app-study-cds-dev-task-req-history',
  templateUrl: './study-cds-dev-task-req-history.component.html',
  styleUrls: ['./study-cds-dev-task-req-history.component.css']
})
export class StudyCdsDevTaskReqHistoryComponent implements OnInit, OnDestroy {
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
    private dataService: StudyCDSDevReqService // private requestIdService: StudyCdsDevTaskRequestIdService
  ) {}

  ngOnInit(): void {
   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
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
      header: 'Development Category',
      field: 'developmentCategoryPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Development Sub Category',
      field: 'developmentSubCategoryPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Development Detail',
      field: 'developmentDetail',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Is this output to be uploaded to DRT',
      field: 'drtused',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Development Status',
      field: 'developmentStatusPDescription',
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
      header: 'No Of Units',
      field: 'noOfUnits',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    //
    //isThisaProgrammingPpcid
    {
      header: 'Is this an update to an existing Program',
      field: 'isThisaProgrammingPpcDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Programming Lead',
      field: 'validationProgrammerDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Priority',
      field: 'priorityStatus',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Programmer Assigned',
      field: 'cdsassignedToDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Validation Programmer',
      field: 'validationProgrammerDisplayName',
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
      header: 'Link to Specifications',
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
