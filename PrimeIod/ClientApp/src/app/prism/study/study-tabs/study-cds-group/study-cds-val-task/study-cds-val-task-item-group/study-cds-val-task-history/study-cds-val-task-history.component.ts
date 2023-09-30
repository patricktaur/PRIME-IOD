import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadChildren, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSValReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-req.service';

@Component({
  selector: 'app-study-cds-val-task-history',
  templateUrl: './study-cds-val-task-history.component.html',
  styleUrls: ['./study-cds-val-task-history.component.css']
})
export class StudyCdsValTaskHistoryComponent implements OnInit {
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
    private dataService: StudyCDSValReqService // private requestIdService: StudyCdsDevTaskRequestIdService
  ) {}

  ngOnInit(): void {
   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    console.log('In History id:' + this.id);
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
      field: 'history',
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
    //Four fields from parent-parent Devp table Omitted.
    //Db reference field is a string - normal table relationship not possible.
    //Will include if asked by Icon - Patrick 29Apr2022
    //Development Task Category, Development Task Details, Is this an ... program, No. of Umits

    // {
    //   header: 'Development Status',
    //   field: 'developmentStatusPDescription',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },
    // {
    //   header: 'Due Date',
    //   field: 'dueDate',
    //   type: 'date',
    //   format: 'dd-MMM-yyyy',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },
    // {
    //   header: 'Completed Date',
    //   field: 'completedDate',
    //   type: 'date',
    //   format: 'dd-MMM-yyyy',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },
    // {
    //   header: 'Completed By',
    //   field: 'completedByDisplayName',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },
    // {
    //   header: 'No Of Units',
    //   field: 'noOfUnits',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },

    //
    //isThisaProgrammingPpcid
    // {
    //   header: 'Is this an update to an existing Program',
    //   field: 'isThisaProgrammingPpcDescription',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },
    {
      header: 'Validation Status',
      field: 'validationStatus',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Current Validation Round',
      field: 'currentValidationRound',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Validation Task Involved',
      field: 'validationTaskInvolved',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Validation Start Date',
      field: 'validationStartDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Validation End Date',
      field: 'validationEndDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Final Validation round',
      field: 'finalValidationRound',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Total Prog Issues',
      field: 'totalProgIssues',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Total Spec Issues',
      field: 'totalSpecIssues',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Total Val Issues',
      field: 'totalValIssues',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Link to Val Documents',
      field: 'linkToValDocuments',
      width: '50',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      //todo: Name required
      header: 'Validation POC',
      field: 'validationPocUDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      //similar to V1, display of names preferred.
      header: 'Validation Members',
      field: 'validationMembers',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Validation Due Date',
      field: 'validationDueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    }
  ];
}
