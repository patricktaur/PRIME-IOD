import { Component, Input, OnInit, Inject, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

import { CDSDelService } from '@app/prism/cds-trackers/cds-del-task-req-group/cds-del.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { BatchActionService } from '@app/prism/cds-trackers/cds-shared-comps/batch-action.service';
import { CdsDelTaskFilterService } from '@app/prism/cds-trackers/cds-del-task-req-group/cds-del-task-filter.service';

@Component({
  selector: 'app-cds-del-req-base-list',
  templateUrl: './cds-del-req-base-list.component.html',
  styleUrls: ['./cds-del-req-base-list.component.css']
})
export class CdsDelReqBaseListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() filters: any;

  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number = 0;

  batchActionMode = false;
  batchActionProcessMessage: any;
  //stringArr = [];
  batchActionOptions: any = [];
  serverResponses: any = [];

  loadSub: Subscription | undefined;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSDelService,
    @Inject('cds-delivery-server-response') private serverResponseService: ServerResponseService,
    @Inject('cds-delivery-batch-actions') private batchActionService: BatchActionService,
    private cdsDelTaskFilterService: CdsDelTaskFilterService
  ) {}

  ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    this.batchActionOptions = this.batchActionService.batchActionOptions;
    this.batchActionMode = this.batchActionService.batchActionMode;
    this.cdsDelTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.filters = filters; //{... filters};
      }
      this.loadReport(this.filters);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadReport(changes['filters'].currentValue);
  }

  // get title() {
  //   let retValue = '';

  //   switch (this.filters.dueType) {
  //     case 'all-overdue':
  //       retValue = 'All Delivery Tasks Due - Overdue';
  //       break;
  //     case 'all-dueToday':
  //       retValue = 'All Delivery Tasks Due - Due Today';
  //       break;
  //     case 'all-dueNextFive':
  //       retValue = 'All Delivery Tasks Due - Due in 5 days';
  //       break;
  //     case 'my-due-overdue':
  //       retValue = 'My Delivery Tasks - Overdue';
  //       break;
  //     case 'my-due-dueToday':
  //       retValue = 'My Delivery Tasks - My Due Today';
  //       break;
  //     case 'my-due-dueNextFive':
  //       retValue = 'My Delivery Tasks - Due in 5 days';
  //       break;
  //     case 'me-as-programmer-overdue':
  //       retValue = 'My Delivery Tasks due as Programmer Assigned -   Overdue';
  //       break;
  //     case 'me-as-programmer-dueToday':
  //       retValue = 'My Delivery Tasks due as Programmer Assigned - Due Today';
  //       break;
  //     case 'me-as-programmer-dueNextFive':
  //       retValue = 'My Delivery Tasks due as Programmer Assigned - Due in 5 days';
  //       break;
  //     default:
  //       retValue = '-----';
  //     // return predicate;
  //   }
  //   return retValue;
  // }

  loadReport(filters: any) {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.cdsTrackerServices.getCdsDeliveryTaskList(filters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res.records;
          this.recordCount = res.recordCount;
          this.filteredRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onPageChange(pageOptions: any) {
    this.filters.pageNumber = pageOptions.page;
    this.filters.pageSize = pageOptions.pageSize;
    this.cdsDelTaskFilterService.setFilters(this.filters);

    this.loadReport(this.filters);
  }

  add() {
    this.router.navigate(['new'], {
      relativeTo: this.actRoute.parent,
      state: { studyId: 0, id: 0 }
    });
  }

  open(id: number) {
    this.router.navigate(['item-group'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  processBatchActions(batchActions: any) {
    this.isLoading = true;

    this.loadSub = this.cdsTrackerServices.processBatchActions(batchActions).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.batchActionProcessMessage = res;

          this.batchActionService.clear();
          this.batchActionOptions = this.batchActionService.batchActionOptions;

          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }
  batchActionModeChanged(value: any) {
    this.batchActionMode = value;
    this.batchActionService.batchActionMode = value;
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    // if (this.batchActionMode == true) {
    //   this.batchActionService.addToBatchActions(id);
    // } else {
    //   if (id) {
    //     this.open(id);
    //   }
    // }
    switch (actionCommand) {
      case 'open':
        this.open(id);
        break;
      case 'add':
        this.batchActionService.addToBatchActions(id);
        break;
      default:
        break;
    }
  }
  columns: Array<UIGridColumn> = [
    // {
    //   header: 'Task Id',
    //   field: 'deliveryTaskRequestRecId',
    //   actionType: 'link',
    //   linkField: 'deliveryTaskRequestRecId',
    //   linkPath: 'item-group' //working
    // },

    {
      header: 'Task Id',
      field: 'deliveryTaskRequestRecId',
      actionType: 'raise-event',
      actionCommand: 'open',
      actionField: 'deliveryTaskRequestRecId'
      // linkField: 'deliveryTaskRequestRecId',
      // linkPath: 'item-group' //working
    },
    {
      header: 'Batch Actions',
      field: 'deliveryTaskRequestRecId',
      actionType: 'raise-event',
      actionCommand: 'add',
      actionField: 'deliveryTaskRequestRecId',
      linkText: ' + '
      // linkField: 'outputTaskRequestRecId',
      // linkPath: 'item-group' //working
    },
    {
      header: 'Icon Number',
      field: 'studyIconNumber'
    },

    {
      header: 'Region',
      field: 'region',
      hide: true
    },
    {
      header: 'Portfolio',
      field: 'portfolio',
      width: 100,
      hide: true
    },

    {
      header: 'Sponsor',
      field: 'sponsor',
      width: 100
    },

    {
      header: 'Study Name',
      field: 'studyName',
      width: 100
    },
    {
      header: 'Delivery Category',
      field: 'deliveryTaskRequestDeliveryTaskCategory',
      width: 50
    },

    {
      header: 'Delivery Detail',
      field: 'deliveryTaskRequestDeliveryTaskDetail',
      width: 50
    },

    {
      header: 'Created Date',
      field: 'deliveryTaskRequestCreatedOn',
      type: 'date',
      format: 'deliveryTaskRequestCreatedOn' ? 'dd-MMM-yyyy' : '',
      align: 'center'
    },
    {
      header: 'Due Date',
      field: 'deliveryTaskRequestDueDate',
      type: 'date',
      format: 'deliveryTaskRequestDueDate' ? 'dd-MMM-yyyy' : '',
      align: 'center'
    },
    {
      header: 'Recurring Frequency',
      field: 'deliveryTaskRequestRecurringFrequency',
      width: 50
    },
    {
      header: 'Completed Date',
      field: 'deliveryTaskRequestCompletedDate',
      type: 'date',
      format: 'deliveryTaskRequestCompletedDate' ? 'dd-MMM-yyyy' : '',
      align: 'center'
    },

    {
      header: 'Completed By',
      field: 'deliveryTaskRequestCompletedBy',
      width: 50
    },

    {
      header: 'Programming Lead',
      field: 'deliveryTaskRequestClinicalDataDeliveryLead',
      width: 50
    },
    {
      header: 'Programmer Assigned',
      field: 'deliveryTaskRequestCDSAssignedTo',
      width: 50
    },
    {
      header: 'Requestor',
      field: 'deliveryTaskRequestRequestor',
      width: 50
    },
    {
      header: 'On Scheduler',
      field: 'deliveryTaskRequestOnScheduler',
      width: 50,
      hide: true
    },
    {
      header: 'Version',
      field: 'deliveryTaskRequestVersionNumber',
      width: 50,
      hide: true
    },

    {
      header: 'Last Saved By',
      field: 'deliveryTaskRequestLastSavedBy',
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'deliveryTaskRequestUpdatedOn',
      type: 'date',
      format: 'deliveryTaskRequestUpdatedOn' ? 'dd-MMM-yyyy' : '',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
