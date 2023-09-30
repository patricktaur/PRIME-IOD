import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CdsPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-pagination-and-filters';
import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';
import { StudyCdsDevFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-filter.service';
import { Subscription } from 'rxjs';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
@Component({
  selector: 'app-study-cds-development-task-requests-list',
  templateUrl: './study-cds-development-task-requests-list.component.html',
  styleUrls: ['./study-cds-development-task-requests-list.component.css']
})
export class StudyCDSDevelopmentTaskRequestsListComponent extends StudyListBase implements OnInit {
  override title = 'StudyCDSDevelopmentTaskRequests';
  override controllerName = 'TblDevelopmentTaskRequests';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';
  i = 0;

  // selectedFilters: any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'task-id',
  //   sortBy: 'asc',
  //   sortOn: 'task-id',
  //   completed: 'no'
  // };

  selectedFilters: CdsDevpPaginationAndFilters | any;

  // selectedFilters: CdsDevpPaginationAndFilters = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: '',
  //   sortOn: 'task-id',
  //   sortBy: 'asc',
  //   searchText: '',
  //   // textSearchField: '',
  //   // textSearch: '',
  //   region: [],
  //   portfolio: [],
  //   sponsor: [],
  //   cdms: [],
  //   dmpm: [],
  //   requestor: [],
  //   cDSAssignedTo: [],
  //   clinicalDataDeliveryLead: [],
  //   taskCategory: [],
  //   dueDateFrom: null,
  //   dueDateTo: null,
  //   status: [],
  //   priority: '',
  //   completed: 'no',
  //   dueType: ''
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
    private studyCdsDevFilterService: StudyCdsDevFilterService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  // constructor(private studycdsdevelopmenttaskrequestsEditService: StudyEditAService) {}

  override ngOnInit(): void {
    if (this.i == 0) {
      super.ngOnInit();
      this.studyCdsDevFilterService.filters.subscribe((filters: CdsDevpPaginationAndFilters) => {
        if (filters) {
          this.selectedFilters = filters;
          console.log('fetch');
          console.log(this.selectedFilters);
        }
      });
      this.i = 1;
    }

    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      this.studyType = st.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/development-request/item-group/edit';
    });

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
    console.log('filter change');
    console.log(filters);
    console.log(this.selectedFilters);
    this.studyCdsDevFilterService.setFilters(filters);
  }

  onResetFilters() {
    this.studyCdsDevFilterService.resetFilters();
  }
  pageOptionsChanged(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions?.pageNumber;
    this.selectedFilters.pageSize = pageOptions?.pageSize;
    this.studyCdsDevFilterService.setFilters(this.selectedFilters);
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
    if (this.selectedFilters?.taskCategory && this.selectedFilters?.taskCategory.length > 0) {
      filter2 = null;
      filter2 = filter1.filter(
        (n: any) => this.selectedFilters?.taskCategory.indexOf(n.developmentCategoryPDescription) != -1
      );
    }

    let filter3 = filter2;
    if (this.selectedFilters?.status && this.selectedFilters?.status.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.selectedFilters?.status.indexOf(n.developmentStatusPDescription) != -1);
    }

    let filter4 = filter3;
    if (this.selectedFilters?.dueDateFrom) {
      filter4 = null;
      filter4 = filter3.filter(
        (n: any) =>
          //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
          new Date(n.dueDate).getTime() >= new Date(this.selectedFilters?.dueDateFrom).getTime()
      );
    }

    let filter5 = filter4;
    if (this.selectedFilters?.dueDateTo) {
      filter5 = null;
      filter5 = filter4.filter(
        (n: any) =>
          //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
          new Date(n.dueDate).getTime() <= new Date(this.selectedFilters?.dueDateTo).getTime()
      );
    }

    let filter6 = filter5;
    if (this.selectedFilters?.completed && this.selectedFilters?.completed == 'yes') {
      filter6 = null;
      filter6 = filter5.filter(
        // completedDate
        (n: any) => n.completedDate !== null
      );
    }

    let filter7 = filter6;
    if (this.selectedFilters?.completed && this.selectedFilters?.completed == 'no') {
      filter7 = null;
      filter7 = filter6.filter(
        // completedDate
        (n: any) => n.completedDate == null
      );
    }

    let filter8 = filter7;
    if (this.selectedFilters?.taskSubCategory && this.selectedFilters?.taskSubCategory.length > 0) {
      filter8 = null;
      filter8 = filter7.filter(
        (n: any) => this.selectedFilters?.taskSubCategory.indexOf(n.developmentSubCategoryPDescription) != -1
      );
    }

    return filter8;
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
      linkPath: 'item-group' //working
    },

    // {
    //   header: 'Development Task ID',
    //   field: 'recId',
    //   align: 'right'
    // },
    {
      header: 'Development Category',
      field: 'developmentCategoryPDescription'
    },
    {
      header: 'Development Sub Category',
      field: 'developmentSubCategoryPDescription'
    },
    {
      header: 'Development Status',
      field: 'developmentStatusPDescription'
    },
    {
      header: 'Development Detail',
      field: 'developmentDetail',
      width: 30
    },

    {
      header: 'Is this output to be uploaded to DRT',
      field: 'drtusedId'
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
      header: 'Programmer Assigned',
      field: 'cdsassignedToDisplayName'
    },
    {
      header: 'Validation Programmer',
      field: 'validationProgrammerDisplayName'
    }
  ];

  override ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
