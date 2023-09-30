import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadChildren, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSDeliveryReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-req.service';

@Component({
  selector: 'app-study-cds-del-task-history',
  templateUrl: './study-cds-del-task-history.component.html',
  styleUrls: ['./study-cds-del-task-history.component.css']
})
export class StudyCdsDelTaskHistoryComponent implements OnInit {
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
    private dataService: StudyCDSDeliveryReqService // private requestIdService: StudyCdsDevTaskRequestIdService
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
      header: 'Delivery Category',
      field: 'deliveryTaskCategoryPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Delivery Detail',
      field: 'deliveryTaskDetail',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Delivery Type',
      field: 'deliveryTypeDescription',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Recipients Name(s)',
      field: 'recipientsNames',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Blinded or Unblinded Data Delivery or N/A',
      field: 'blindedUnblindedDescription',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Data Restricted Comment',
      field: 'dataRestrictedComment',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Data Cut Off',
      field: 'dataCutOffDescription',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Data Cut Off Date',
      field: 'dateCutOffDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Data Cut Off Comment',
      field: 'dateCutOffComment',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Exclude any dataset(s)',
      field: 'excludeAnyDatasetDescription',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Exclude any dataset Comment',
      field: 'excludeAnyDatasetComment',
      width: 30,
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
      header: 'Recurring Frequency',
      field: 'recurringFrequencyPDescription',
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
      header: 'Programming Lead',
      field: 'clinicalDataDeliveryLeadDisplayName',
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
      header: 'Requestor',
      field: 'requestorDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Retranser',
      field: 'retransferPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'On Scheduler',
      field: 'onSchedulerPid',
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
      header: 'Globalscape',
      field: 'globalscape',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'CDS Instruction Task',
      field: 'instructionIdProgramName',
      width: 100,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Overdue Comments',
      field: 'overDueComment',
      width: 100,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Comments',
      field: 'comments',
      width: 100,
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
