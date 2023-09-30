import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
// import { CdsPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-pagination-and-filters';
// import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { ImiRaBatchActionService } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-batch-action.service';

// import {ImiRaDevReqService} from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-dev-req.service'
import { ImiRaOutReqService } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-output-req/imi-ra-out-req.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
// import { ConsoleLogger } from '@generic-ui/ngx-grid/common/cdk/logger/console.logger';
// import { String } from 'core-js';
// import { exit } from 'process';
@Component({
  selector: 'app-imi-ra-ouput-req-list',
  templateUrl: './imi-ra-ouput-req-list.component.html',
  styleUrls: ['./imi-ra-ouput-req-list.component.css']
})
export class ImiRaOuputReqListComponent extends StudyListBase implements OnInit, OnDestroy {
  override title = 'StudyCDSDevelopmentTaskRequests';
  override controllerName = 'TblImiRaOutputRequest';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';
  isLoading = false;
  selectedFilters: any = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: '',
    sortOn: 'task-id',
    sortBy: 'asc',
    searchText: ''
  };

  batchActionMode = false;
  batchActionProcessMessage: any;
  batchActionOptions: any = [];
  serverResponses: any = [];
  loadSub: Subscription | undefined;

  // hasImiManagerRole: boolean = false;
  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    private imiRaOutReqService: ImiRaOutReqService,
    private credentialsService: CredentialsService,
    @Inject('imi-ra-output-server-response') private serverResponseService: ServerResponseService,
    @Inject('imi-ra-output-batch-actions') private batchActionService: ImiRaBatchActionService
  ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // this.hasImiManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.IMI_PM);
    
    this.serverResponses = this.serverResponseService.serverResponses;
    this.batchActionOptions = this.batchActionService.batchActionOptions;
    this.batchActionMode = this.batchActionService.batchActionMode;
  
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];

    this.showFooterActions = this.mode != 'view' ? true : false;
    if (this.mode == 'view') {
      //remove edit - del button columns
      this.isViewMode = true;
    }
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
  }

  get filteredRecords() {
    // "recId": 2638

    let searchText = '';
    searchText = this.selectedFilters?.searchText;
    searchText = searchText?.toLowerCase();
    let filter1: any = this.records;
    if (searchText?.length > 0) {
      filter1 = null;
      filter1 = this.records?.filter(
        (x: any) =>
          x.recId
            .toString()
            .toLowerCase()
            .indexOf(searchText) != -1
      );
    }

    let filter2 = filter1;
    if (this.selectedFilters?.outputType && this.selectedFilters?.outputType.length > 0) {
      filter2 = null;
      var str = this.selectedFilters.outputType.toString();
      var splitted = str.split(',', 1000);
      splitted.forEach(function(value: string) {
        filter2 = filter1.filter((n: any) => n.outputTypeNames.indexOf(value) != -1);
        // Surekha Commented
        // exit;
      });
    }

    let filter3 = filter2;
    if (this.selectedFilters?.outputStatus && this.selectedFilters?.outputStatus.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.selectedFilters?.outputStatus.indexOf(n.outputStatusDescription) != -1);
    }

    let filter4 = filter3;
    if (this.selectedFilters?.requestedDueDateFrom) {
      filter4 = null;
      filter4 = filter3.filter(
        (n: any) =>
          //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
          new Date(n.requestedDueDate).getTime() >= new Date(this.selectedFilters?.requestedDueDateFrom).getTime()
      );
    }

    let filter5 = filter4;
    if (this.selectedFilters?.requestedDueDateTo) {
      filter5 = null;
      filter5 = filter4.filter(
        (n: any) =>
          //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
          new Date(n.requestedDueDate).getTime() <= new Date(this.selectedFilters?.requestedDueDateTo).getTime()
      );
    }

    let filter6 = filter5;
    if (this.selectedFilters?.requestor && this.selectedFilters?.requestor.length > 0) {
      filter6 = null;
      filter6 = filter5.filter((n: any) => this.selectedFilters?.requestor.indexOf(n.requestorDisplayName) != -1);
    }

    let filter7 = filter6;
    if (this.selectedFilters?.requestedPriority && this.selectedFilters?.requestedPriority.length > 0) {
      filter7 = null;
      filter7 = filter6.filter(
        (n: any) => this.selectedFilters?.requestedPriority.indexOf(n.requestedpriorityPDescription) != -1
      );
    }

    let filter8 = filter7;
    if (this.selectedFilters?.outputStatus && this.selectedFilters?.outputStatus.length > 0) {
      filter8 = null;
      filter8 = filter7.filter((n: any) => this.selectedFilters?.outputStatus.indexOf(n.outputStatusDescription) != -1);
    }

    let filter9 = filter8;
    if (this.selectedFilters?.developerAssigned && this.selectedFilters?.developerAssigned.length > 0) {
      filter9 = null;
      filter9 = filter8.filter(
        (n: any) => this.selectedFilters?.developerAssigned.indexOf(n.developerAssignedDisplayName) != -1
      );
    }

    return filter9;
  }

  onItemClicked(status: any) {
    this.selectedFilters.status = [];
    this.selectedFilters.status.push(status);
    this.selectedFilters = status;
    this.selectedFilters = { ...this.selectedFilters };
  }

  override add(): void {
    this.router.navigate(['new'], { relativeTo: this.actRoute.parent, state: { studyId: this.studyId, id: 0 } });
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

    this.loadSub = this.imiRaOutReqService.processBatchActions(batchActions).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.batchActionProcessMessage = res;
          this.batchActionService.clear();
          this.batchActionOptions = this.batchActionService.batchActionOptions;

          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
          this.reloadRecords();
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  override onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;

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
  //***Todo***
  columns: Array<any> = [
    // {
    //   header: 'Open',
    //   actionType: 'raise-event',
    //   linkText: 'Open',
    //   actionCommand: 'item-group',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    {
      header: 'Open',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkPath: 'item-group'
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
      header: 'Output Task ID',
      field: 'recId',
      align: 'right'
    },
    {
      header: 'Output Types',
      field: 'outputTypeNames'
    },

    {
      header: 'Request Title',
      field: 'requestTitle'
    },
    {
      header: 'Requested Priority',
      field: 'requestedpriorityPDescription'
    },
    {
      header: 'Requested Due Date',
      field: 'requestedDueDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },

    {
      header: 'Requestor',
      field: 'requestorDisplayName'
    },

    {
      header: 'Developer Assigned',
      field: 'developerAssignedDisplayName'
    },
    {
      header: 'Output Status',
      field: 'outputStatusDescription'
    },
    {
      header: 'Output Completed Date',
      field: 'outputCompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },

    {
      header: 'Progress Details',
      field: 'progressDetails'
    }
  ];
}
