import { Component, Input, Inject, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

import { CDSOutputService } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-output.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { BatchActionService } from '@app/prism/cds-trackers/cds-shared-comps/batch-action.service';
import { CdsOutputTaskFilterService } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-output-task-filter.service';

@Component({
  selector: 'app-cds-out-req-base-list',
  templateUrl: './cds-out-req-base-list.component.html',
  styleUrls: ['./cds-out-req-base-list.component.css']
})
export class CdsOutReqBaseListComponent implements OnInit, OnDestroy, OnChanges {
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
    private cdsTrackerServices: CDSOutputService,
    @Inject('cds-output-server-response') private serverResponseService: ServerResponseService,
    @Inject('cds-output-batch-actions') private batchActionService: BatchActionService,
    private cdsDelTaskFilterService: CdsOutputTaskFilterService
  ) {}

  ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    this.batchActionOptions = this.batchActionService.batchActionOptions;
    this.batchActionMode = this.batchActionService.batchActionMode;
    // this.batchActionModeChanged(this.batchActionService.batchActionMode);
    this.cdsDelTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.filters = filters; //{... filters};.
      }
      this.loadReport(this.filters);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadReport(changes['filters'].currentValue);
  }

  loadReport(filters: any) {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.cdsTrackerServices.getCdsOutputTaskList(filters).subscribe(
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
    this.cdsDelTaskFilterService.setFilters(this.filters);
    this.filters.pageNumber = pageOptions.page;
    this.filters.pageSize = pageOptions.pageSize;

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

  addToBatchActions(id: number) {
    // let paddedValue = id.toString().padStart(10, ' '); //to enable sorting in batch-action-component
    // let item = { taskId: id, displayValue: paddedValue };
    // const found = this.selectedItemsForBatchAction.find((element: any) => {
    //   if (element.taskId === id) {
    //     return true;
    //   }
    //   return false;
    // });
    // if (!found) {
    //   this.selectedItemsForBatchAction.push(item);
    // }
  }

  batchActionModeChanged(value: any) {
    this.batchActionMode = value;
    this.batchActionService.batchActionMode = value;
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

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    // if (this.batchActionMode == true) {
    //   this.batchActionService.addToBatchActions(id);
    //   // this.addToBatchActions(id);
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
    //   field: 'outputTaskRequestRecId',
    //   actionType: 'link',
    //   linkField: 'outputTaskRequestRecId',
    //   linkPath: 'item-group' //working
    // },
    {
      header: 'Task Id',
      field: 'outputTaskRequestRecId',
      actionType: 'raise-event',
      actionCommand: 'open',
      actionField: 'outputTaskRequestRecId'
      // linkField: 'outputTaskRequestRecId',
      // linkPath: 'item-group' //working
    },
    {
      header: 'Batch Actions',
      field: 'outputTaskRequestRecId',
      actionType: 'raise-event',
      actionCommand: 'add',
      actionField: 'outputTaskRequestRecId',
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
      header: 'Output Category',
      field: 'outputTaskRequestOutputTaskCategory',
      width: 50
    },

    {
      header: 'Output Sub Category',
      field: 'outputTaskRequestOutputTaskSubCategory',
      width: 50
    },

    {
      header: 'Output Detail',
      field: 'outputTaskRequestOutputTaskDetail',
      width: 50
    },

    {
      header: 'Created Date',
      field: 'outputTaskRequestCreatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Due Date',
      field: 'outputTaskRequestDueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Recurring Frequency',
      field: 'outputTaskRequestRecurringFrequency',
      width: 50
    },
    {
      header: 'Completed Date',
      field: 'outputTaskRequestCompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },

    {
      header: 'Completed By',
      field: 'outputTaskRequestCompletedBy',
      width: 50
    },

    {
      header: 'Programming Lead',
      field: 'outputTaskRequestClinicalDataDeliveryLead',
      width: 50
    },
    {
      header: 'Programmer Assigned',
      field: 'outputTaskRequestCDSAssignedTo',
      width: 50
    },
    {
      header: 'Requestor',
      field: 'outputTaskRequestRequestor',
      width: 50
    },
    {
      header: 'On Scheduler',
      field: 'outputTaskRequestOnScheduler',
      width: 50,
      hide: true
    },
    {
      header: 'Version',
      field: 'outputTaskRequestVersionNumber',
      width: 50,
      hide: true
    },

    {
      header: 'Last Saved By',
      field: 'outputTaskRequestLastSavedBy',
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'outputTaskRequestUpdatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
