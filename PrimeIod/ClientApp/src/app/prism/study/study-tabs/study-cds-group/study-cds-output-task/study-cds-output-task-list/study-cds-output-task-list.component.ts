import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';
import { StudyCdsOutputFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-filter.service';
import { Subscription } from 'rxjs';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-cds-output-task-list',
  templateUrl: './study-cds-output-task-list.component.html',
  styleUrls: ['./study-cds-output-task-list.component.css']
})
export class StudyCDSOutputTaskListComponent extends StudyListBase implements OnInit {
  override title = 'StudyCDSOutputTask';
  // controllerName = 'vwCDSOutputTaskV2';
  // actionName = 'list-view'; //'report-list' not recognized by server;

  override controllerName = 'TblOutputTaskRequests';
  override actionName = 'records'; //'report-list' not recognized by server;

  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  selectedFilters: CdsOutputPaginationAndFilters | any;
  // selectedFilters: any = {
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
    private studyCdsOutputFilterService: StudyCdsOutputFilterService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  // constructor(private studycdsoutputtaskEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
    this.studyCdsOutputFilterService.filters.subscribe((filters: CdsOutputPaginationAndFilters) => {
      if (filters) {
        this.selectedFilters = filters;
      }
    });

    this.subscription = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      this.studyId = stProp.studyId;
      this.studyType = stProp.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/output-request/item-group/edit';
    })

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
    this.studyCdsOutputFilterService.setFilters(filters);
  }

  onResetFilters() {
    this.studyCdsOutputFilterService.resetFilters();
  }

  pageOptionsChanged(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions?.pageNumber;
    this.selectedFilters.pageSize = pageOptions?.pageSize;
    this.studyCdsOutputFilterService.setFilters(this.selectedFilters);
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
      filter2 = filter1.filter((n: any) => this.selectedFilters?.taskCategory.indexOf(n.categoryPDescription) != -1);
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

    let filter7 = filter6;
    if (this.selectedFilters?.taskSubCategory && this.selectedFilters?.taskSubCategory.length > 0) {
      filter7 = null;
      filter7 = filter6.filter(
        (n: any) => this.selectedFilters?.taskSubCategory.indexOf(n.subCategoryPDescription) != -1
      );
    }
    return filter7;

    // return this.records;
  }

  override add(): void {
    this.router.navigate(['new'], { relativeTo: this.actRoute.parent, state: { studyId: this.studyId, id: 0 } });
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Open',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkPath: 'item-group' //working
    },

    {
      header: 'Output Category',
      field: 'categoryPDescription',
      width: 50
    },

    {
      header: 'Output Sub Category',
      field: 'subCategoryPDescription',
      width: 50
    },

    {
      header: 'Output Detail',
      field: 'outputTaskDetail',
      width: 50
    },

    {
      header: 'Created Date',
      field: 'createdOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Due Date',
      field: 'dueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Recurring Frequency',
      field: 'recurringFrequencyPDescription',
      width: 50
    },
    {
      header: 'Completed Date',
      field: 'completedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },

    {
      header: 'Completed By',
      field: 'completedByDisplayName',
      width: 50
    },

    {
      header: 'Programming Lead',
      field: 'clinicalDataDeliveryLeadDisplayName',
      width: 50
    },
    {
      header: 'Programmer Assigned',
      field: 'cdsassignedToDisplayName',
      width: 50
    },
    {
      header: 'Requestor',
      field: 'requestorDisplayName',
      width: 50
    },
    {
      header: 'On Scheduler',
      field: 'onSchedulerPid',
      width: 50
    },
    {
      header: 'Version',
      field: 'versionNumber',
      width: 50
    },

    {
      header: 'Last Saved By',
      field: 'updatedByDisplayName',
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'updatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];
}
