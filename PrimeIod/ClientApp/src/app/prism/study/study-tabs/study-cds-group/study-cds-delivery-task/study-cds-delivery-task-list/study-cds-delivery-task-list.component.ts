import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';
import { StudyCdsDelFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-del-filter.service';
import { Subscription } from 'rxjs';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-cds-delivery-task-list',
  templateUrl: './study-cds-delivery-task-list.component.html',
  styleUrls: ['./study-cds-delivery-task-list.component.css']
})
export class StudyCDSDeliveryTaskListComponent extends StudyListBase implements OnInit {
  override title = 'StudyCDSDeliveryTask';

  // controllerName = 'vwCDSDeliveryTaskV2';
  // actionName = 'report-list';

  override controllerName = 'TblDeliveryRequests';
  override actionName = 'records';

  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  selectedFilters: CdsOutputPaginationAndFilters | any;
  // any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'task-id',
  //   sortBy: 'asc',
  //   sortOn: 'task-id',
  //   completed: 'no'
  // };

  subscription: Subscription | undefined;
  // hasDMManagerRole: boolean = false;
  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  studyType = "";
  menuAccessLink = "";

  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    private studyCdsDelFilterService: StudyCdsDelFilterService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  // constructor(private studycdsdeliverytaskEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
    this.studyCdsDelFilterService.filters.subscribe((filters: CdsOutputPaginationAndFilters) => {
      if (filters) {
        this.selectedFilters = filters;
      }
    });
    
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      this.studyType = st.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/delivery-request/item-group/edit';
    });

    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];

    this.showFooterActions = this.mode != 'view' ? true : false;
    if (this.mode == 'view') {
      //remove edit - del button columns
      this.isViewMode = true;
      // this.columns.splice(0, 2);
    }  
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
    this.studyCdsDelFilterService.setFilters(filters);
  }

  onResetFilters() {
    this.studyCdsDelFilterService.resetFilters();
  }

  pageOptionsChanged(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions?.pageNumber;
    this.selectedFilters.pageSize = pageOptions?.pageSize;
    this.studyCdsDelFilterService.setFilters(this.selectedFilters);
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
    if (this.selectedFilters?.taskCategory && this.selectedFilters?.taskCategory.length > 0) {
      filter2 = null;
      filter2 = filter1.filter(
        (n: any) => this.selectedFilters?.taskCategory.indexOf(n.deliveryTaskCategoryPDescription) != -1
      );
    }

    let filter3 = filter2;
    if (this.selectedFilters?.dueDateFrom) {
      filter3 = null;
      filter3 = filter2.filter(
        (n: any) =>
          //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
          new Date(n.dueDate).getTime() >= new Date(this.selectedFilters?.dueDateFrom).getTime()
      );
    }

    let filter4 = filter3;
    if (this.selectedFilters?.dueDateTo) {
      filter4 = null;
      filter4 = filter3.filter(
        (n: any) =>
          //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
          new Date(n.dueDate).getTime() <= new Date(this.selectedFilters?.dueDateTo).getTime()
      );
    }

    let filter5 = filter4;
    if (this.selectedFilters?.completed == 'yes') {
      filter5 = null;
      filter5 = filter4.filter((n: any) => n.completedDate !== null);
    }
    let filter6 = filter5;
    if (this.selectedFilters?.completed == 'no') {
      filter6 = null;
      filter6 = filter5.filter((n: any) => n.completedDate === null);
    }

    return filter6;

    // return this.records;
  }

  override add(): void {
    this.router.navigate(['new'], { relativeTo: this.actRoute.parent, state: { studyId: this.studyId, id: 0 } });
  }
  //***Todo***
  columns: Array<any> = [
    // {
    //   header: 'Open',
    //   actionType: 'raise-event',
    //   linkText: 'Open',
    //   actionCommand: 'item-group',
    //   actionField: 'deliveryTaskRequestRecId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    {
      header: 'Open',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkPath: 'item-group' //working
    },
    // {
    //   header: 'Task ID',
    //   field: 'deliveryTaskRequestRecId',
    //   align: 'right'
    // },
    {
      header: 'Delivery Category',
      field: 'deliveryTaskCategoryPDescription'
    },
    // {
    //   header: 'Development Status',
    //   field: 'XXX'
    // },
    {
      header: 'Development Detail',
      field: 'deliveryTaskDetail',
      width: 30
    },

    {
      header: 'Recurring Frequency',
      field: 'recurringFrequencyPDescription'
    },

    {
      header: 'Created Date',
      field: 'createdOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Due Date',
      field: 'dueDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Completed Date',
      field: 'completedDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Completed By',
      field: 'completedByDisplayName'
    },
    {
      header: 'Programming Lead',
      field: 'clinicalDataDeliveryLeadDisplayname'
    },
    {
      header: 'Programmer Assigned',
      field: 'cdsassignedToDisplayname'
    },
    {
      header: 'Requestor',
      field: 'requestorDisplayname'
    },
    {
      header: 'On Scheduler',
      field: 'onSchedulerPid'
    },
    {
      header: 'Global Scape',
      field: 'globalscapePid'
    },
    {
      header: 'Retransfer',
      field: 'retransferPid'
    },
    {
      header: 'Comments',
      field: 'comments'
    },
    {
      header: 'Version Number',
      field: 'versionNumber'
    },
    {
      header: 'Task Instruction Id',
      field: 'cdsinstructionTaskId'
    },
    {
      header: 'Link to Task Instruction',
      field: 'linkToDocumentation'
    },
    {
      header: 'Overdue Comments',
      field: 'overDueComment'
    },
    {
      header: 'Last Saved By',
      field: 'updatedByDisplayName'
    },
    {
      header: 'Last Saved On',
      field: 'updatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    }
  ];
}
