import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { ImiRaTrackersService } from '@app/prism/imi-ra-trackers/imi-ra-trackers.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { ImiRaBatchActionService } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-batch-action.service';

import { ImiRaDevReqService } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-dev-req.service';

@Component({
  selector: 'app-imi-ra-dev-req-list',
  templateUrl: './imi-ra-dev-req-list.component.html',
  styleUrls: ['./imi-ra-dev-req-list.component.css']
})
export class ImiRaDevReqListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filters: any;

  selectedFilters: any = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: 'icon-number',
    sortBy: 'asc',
    sortOn: 'icon-number-task-id',
    completed: 'no'
  };

  isLoading = true;
  records: any = [];
  filteredRecords: any;
  recordCount: number = 0;

  batchActionMode = false;
  batchActionProcessMessage: any;
  batchActionOptions: any = [];
  serverResponses: any = [];
  loadSub: Subscription | undefined;
  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private imiRaTrackerServices: ImiRaTrackersService,
    private imiRaDevReqService: ImiRaDevReqService,
    @Inject('imi-ra-development-server-response') private serverResponseService: ServerResponseService,
    @Inject('imi-ra-development-batch-actions') private batchActionService: ImiRaBatchActionService
  ) {}

  ngOnInit(): void {
    // this.serverResponses = this.serverResponseService.serverResponses;
    // this.loadReport();
    //  this.loadReport(this.selectedFilters);
    this.serverResponses = this.serverResponseService.serverResponses;
    this.batchActionOptions = this.batchActionService.batchActionOptions;
    this.batchActionMode = this.batchActionService.batchActionMode;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.loadReport(changes.filters.currentValue);
  }

  loadReport(filters: any) {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.imiRaTrackerServices.getImiRaDevTaskList(filters).subscribe(
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

  add() {
    ///study/cds/devp-request/item-group
    //relativeTo: this.actRoute.parent,
    this.router.navigate(['new'], {
      relativeTo: this.actRoute.parent,
      state: { studyId: 0, id: 0 }
    });
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
    this.selectedFilters = { ...this.selectedFilters };
    this.loadReport(filters);
  }

  // onPageChange(pageOptions: any) {
  //   this.filters.pageNumber = pageOptions.page;
  //   this.filters.pageSize = pageOptions.pageSize;
  //   this.loadReport(this.filters);
  // }

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport(this.selectedFilters);
  }

  batchActionModeChanged(value: any) {
    this.batchActionMode = value;
    this.batchActionService.batchActionMode = value;
  }

  processBatchActions(batchActions: any) {
    this.isLoading = true;

    this.loadSub = this.imiRaDevReqService.processBatchActions(batchActions).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.batchActionProcessMessage = res;
          this.batchActionService.clear();
          this.batchActionOptions = this.batchActionService.batchActionOptions;

          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
          this.loadReport(this.selectedFilters);
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
    console.log('XXXx');
    switch (actionCommand) {
      // case 'open':
      //   this.open(id);
      //   break;
      case 'add':
        this.batchActionService.addToBatchActions(id);
        break;
      default:
        break;
    }
  }
  columns: Array<UIGridColumn> = [
    {
      header: 'Task Id',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkPath: 'item-group' //working
    },
    {
      header: 'Clone',
      field: 'recId',
      actionType: 'raise-event',
      actionCommand: 'add',
      actionField: 'recId',
      linkText: ' + '
    },
    {
      header: 'Icon Number',
      field: 'studyIconNumber'
    },

    {
      header: 'Protocol Name',
      field: 'studyName'
    },
    {
      header: 'Sponsor',
      field: 'sponsor',
      align: 'center'
    },

    {
      header: 'Protocol',
      field: 'protocolPhase',
      align: 'center'
    },
    {
      header: 'Development Types',
      field: 'developmentTypeNames',
      width: 100
    },

    {
      header: 'Request Type',
      field: 'requestType'
    },
    {
      header: 'Request Title',
      field: 'requestTitle',
      width: 100
    },
    {
      header: 'Request Priority',
      field: 'requestedPriority'
    },
    {
      header: 'Requested Due Date',
      field: 'requestedDueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },

    {
      header: 'Requestor',
      field: 'requestor'
    },
    {
      header: 'Specification Status',
      field: 'specificationStatus'
    },
    {
      header: 'Spec Location',
      field: 'specLocation'
    },
    {
      header: 'Validation Needed',
      field: 'validationNeeded'
    },
    {
      header: 'Request Details',
      field: 'requestDetails',
      width: 100
    },

    {
      header: 'Developer Assigned',
      field: 'developerAssigned'
    },

    {
      header: 'Qc/Code Review Assigned To',
      field: 'qcCodeAssignedTo'
    },

    {
      header: 'Development Status',
      field: 'developmentStatus'
    },

    {
      header: 'UAT Assigned To',
      field: 'uatAssignedTo'
    },
    {
      header: 'Development Completed Date',
      field: 'developmentCompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'UAT Completed Date',
      field: 'uatcompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Validation Approval Date',
      field: 'validationApprovalDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Progress Details',
      field: 'progressDetails',
      width: 100
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
