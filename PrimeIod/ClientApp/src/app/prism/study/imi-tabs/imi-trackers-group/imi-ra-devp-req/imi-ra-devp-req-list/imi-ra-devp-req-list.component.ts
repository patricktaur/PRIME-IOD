import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CdsPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-pagination-and-filters';
import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { ImiRaBatchActionService } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-batch-action.service';

import { ImiRaDevReqService } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-dev-req.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
@Component({
  selector: 'app-imi-ra-req-list',
  templateUrl: './imi-ra-devp-req-list.component.html',
  styleUrls: ['./imi-ra-devp-req-list.component.css']
})
export class ImiRaReqListComponent extends StudyListBase implements OnInit, OnDestroy {
  override title = 'StudyCDSDevelopmentTaskRequests';
  override controllerName = 'TblImiRaDevelopmentRequest';
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
    private imiRaDevReqService: ImiRaDevReqService,
    private credentialsService: CredentialsService,
    @Inject('imi-ra-development-server-response') private serverResponseService: ServerResponseService,
    @Inject('imi-ra-development-batch-actions') private batchActionService: ImiRaBatchActionService
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

  /*
  <ng-option [value]="'task-id'">Task Id</ng-option>
          <ng-option [value]="'details'"
  */

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
    if (this.selectedFilters?.requestType && this.selectedFilters?.requestType.length > 0) {
      filter2 = null;
      filter2 = filter1.filter(
        (n: any) => this.selectedFilters?.requestType.indexOf(n.newDevelopmentPDescription) != -1
      );
    }

    let filter3 = filter2;
    if (this.selectedFilters?.validationNeeded && this.selectedFilters?.validationNeeded.length > 0) {
      filter3 = null;
      filter3 = filter2.filter(
        (n: any) => this.selectedFilters?.validationNeeded.indexOf(n.validationNeededPDescription) != -1
      );
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
    if (this.selectedFilters?.developmentCompleted && this.selectedFilters?.developmentCompleted == 'yes') {
      filter6 = null;
      filter6 = filter5.filter(
        // completedDate
        (n: any) => n.developmentCompletedDate !== null
      );
    }

    let filter7 = filter6;
    if (this.selectedFilters?.developmentCompleted && this.selectedFilters?.developmentCompleted == 'no') {
      filter7 = null;
      filter7 = filter6.filter(
        // completedDate
        (n: any) => n.developmentCompletedDate == null
      );
    }

    //---

    let filter8 = filter7;
    if (this.selectedFilters?.uatCompleted && this.selectedFilters?.uatCompleted == 'yes') {
      filter8 = null;
      filter8 = filter7.filter(
        // completedDate
        (n: any) => n.uatcompletedDate !== null
      );
    }

    let filter9 = filter8;
    if (this.selectedFilters?.uatCompleted && this.selectedFilters?.uatCompleted == 'no') {
      filter9 = null;
      filter9 = filter8.filter(
        // completedDate
        (n: any) => n.uatcompletedDate == null
      );
    }

    //--
    let filter10 = filter9;
    if (this.selectedFilters?.validaatinCompleted && this.selectedFilters?.validaatinCompleted == 'yes') {
      filter10 = null;
      filter10 = filter9.filter(
        // completedDate
        (n: any) => n.validationApprovalDate !== null
      );
    }

    let filter11 = filter10;
    if (this.selectedFilters?.validaatinCompleted && this.selectedFilters?.validaatinCompleted == 'no') {
      filter11 = null;
      filter11 = filter10.filter(
        // completedDate
        (n: any) => n.validationApprovalDate == null
      );
    }

    let filter12 = filter11;
    if (this.selectedFilters?.requestor && this.selectedFilters?.requestor.length > 0) {
      filter12 = null;
      filter12 = filter11.filter((n: any) => this.selectedFilters?.requestor.indexOf(n.requestorDisplayName) != -1);
    }

    let filter13 = filter12;
    if (this.selectedFilters?.requestedPriority && this.selectedFilters?.requestedPriority.length > 0) {
      filter13 = null;
      filter13 = filter12.filter(
        (n: any) => this.selectedFilters?.requestedPriority.indexOf(n.requestedpriorityPDescription) != -1
      );
    }

    let filter14 = filter13;
    if (this.selectedFilters?.specificationStatus && this.selectedFilters?.specificationStatus.length > 0) {
      filter14 = null;
      filter14 = filter13.filter(
        (n: any) => this.selectedFilters?.specificationStatus.indexOf(n.specificationStatusPDescription) != -1
      );
    }

    let filter15 = filter14;
    if (this.selectedFilters?.developmentStatus && this.selectedFilters?.developmentStatus.length > 0) {
      filter15 = null;
      filter15 = filter14.filter(
        (n: any) => this.selectedFilters?.developmentStatus.indexOf(n.developmentStatusPDescription) != -1
      );
    }

    let filter16 = filter15;
    if (this.selectedFilters?.developerAssigned && this.selectedFilters?.developerAssigned.length > 0) {
      filter16 = null;
      filter16 = filter15.filter(
        (n: any) => this.selectedFilters?.developerAssigned.indexOf(n.developerAssignedDisplayName) != -1
      );
    }

    let filter17 = filter16;
    if (this.selectedFilters?.qcCodeReviewAssignedTo && this.selectedFilters?.qcCodeReviewAssignedTo.length > 0) {
      filter17 = null;
      filter17 = filter16.filter(
        (n: any) => this.selectedFilters?.qcCodeReviewAssignedTo.indexOf(n.developerAssignedDisplayName) != -1
      );
    }

    let filter18 = filter17;
    if (this.selectedFilters?.uatAssignedTo && this.selectedFilters?.uatAssignedTo.length > 0) {
      filter18 = null;
      filter18 = filter17.filter(
        (n: any) => this.selectedFilters?.uatAssignedTo.indexOf(n.uatAssignedToDisplayName) != -1
      );
    }

    return filter18;
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
      header: 'Development Task ID',
      field: 'recId',
      align: 'right'
    },
    {
      header: 'Development Types',
      field: 'developmentTypeNames'
    },

    {
      header: 'Request Type',
      field: 'newDevelopmentPDescription',
      width: 30
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
      header: 'Specification Status',
      field: 'specificationStatusPDescription'
    },
    {
      header: 'Spec Location',
      field: 'specLocation'
    },
    {
      header: 'Validation Needed',
      field: 'validationNeededPDescription'
    },
    {
      header: 'Request Details',
      field: 'requestDetails'
    },
    {
      header: 'Developer Assigned',
      field: 'developerAssignedDisplayName'
    },
    {
      header: 'QC/Code Review Assigned to',
      field: 'qcCodeReviewAssignedToDisplayName'
    },
    {
      header: 'Development Status',
      field: 'developmentStatusPDescription'
    },
    {
      header: 'UAT Assigned To',
      field: 'uatAssignedToDisplayName'
    },

    {
      header: 'Development Completed Date',
      field: 'developmentCompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'UAT Completed Date',
      field: 'uatcompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Validation Approval Date',
      field: 'validationApprovalDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },

    {
      header: 'Progress Details',
      field: 'progressDetails'
    }
  ];

  override ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
