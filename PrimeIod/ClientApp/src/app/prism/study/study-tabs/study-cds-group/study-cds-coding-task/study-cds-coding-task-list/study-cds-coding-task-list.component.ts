import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Json2CsvDownloadService } from '@app/shared/services/json-2-csv-download.service';
import { CdsCodingPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-coding-pagination-and-filters';
import { StudyCdsCodingFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/sutyd-cds-coding-filter.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-study-cds-coding-task-list',
  templateUrl: './study-cds-coding-task-list.component.html',
  styleUrls: ['./study-cds-coding-task-list.component.css']
})
export class StudyCDSCodingTaskListComponent extends StudyListBase implements OnInit {
  override title = 'StudyCDSCodingTask';
  // controllerName = 'vwCDSCodingTaskV2';
  // actionName = 'report-list';

  override controllerName = 'TblCodingRequest';
  override actionName = 'records';

  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  selectedFilters: CdsCodingPaginationAndFilters | any;
  // any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'task-id',
  //   sortBy: 'asc',
  //   sortOn: 'task-id',
  //   completed: 'no'
  // };

  // hasDMManagerRole: boolean = false;
  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  subscription: Subscription | undefined;
  studyType = "";
  menuAccessLink = "";

  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    private studyCdsCodingFilterService: StudyCdsCodingFilterService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  // constructor(private studycdscodingtaskEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
    this.studyCdsCodingFilterService.filters.subscribe((filters: CdsCodingPaginationAndFilters) => {
      if (filters) {
        this.selectedFilters = filters;
      }
    });

    this.subscription = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      this.studyType = stProp.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/coding-request/item-group/edit';
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
    this.studyCdsCodingFilterService.setFilters(filters);
  }

  onResetFilters() {
    this.studyCdsCodingFilterService.resetFilters();
  }

  pageOptionsChanged(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions?.pageNumber;
    this.selectedFilters.pageSize = pageOptions?.pageSize;
    this.studyCdsCodingFilterService.setFilters(this.selectedFilters);
  }

  /*
records: [ { "codingTaskRequestRecId": "168", "studyIconNumber": "0333/2000", "region": "US", "portfolio": "APTIV", "sponsor": "Replica I", "studyName": "20-MUHLOHTAP-30-41", "cdms": "UX EDC (by DataTrak)", "codingTaskRequestCreatedOn": "10/7/2016 8:56:37 AM", "codingTaskRequestCodingTaskCategory": "Perform Medical Coding", "codingTaskRequestCodingTaskDetails": "Please code for clean transfer", "codingTaskRequestDueDate": "10/31/2016 12:00:00 AM", "codingTaskRequestRecurringFrequency": "Ad-Hoc", "codingTaskRequestCompletedDate": "11/1/2016 12:00:00 AM", "codingTaskRequestCompletedBy": "Brandon Taylor", "codingTaskRequestCodingSpecialistAssigned": "Brandon Taylor", "codingTaskRequestRequestor": "Sean Park", "codingTaskRequestComments": null, "codingTaskRequestVersionNumber": "3", "codingTaskRequestLastSavedBy": "Brandon Taylor", "codingTaskRequestUpdatedOn": "11/1/2016 3:59:18 PM", "studyStatus": 108, "currentDmpm": " Robert Wilson", "currentDmpmManager": " Colleen Cruz", "specialProject": "No", "studyType": "DM" }, 
*/
  //***Todo***

  get filteredRecords() {
    // "recId": 2638

    let searchText = '';
    searchText = this.selectedFilters?.searchText;
    searchText = searchText?.toLowerCase();
    let filter1 : any = this.records;
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

    let filter2: any = filter1;
    if (this.selectedFilters?.taskCategory && this.selectedFilters?.taskCategory.length > 0) {
      filter2 = null;
      filter2 = filter1.filter(
        (n: any) => this.selectedFilters?.taskCategory.indexOf(n.codingTaskCategoryPDescription) != -1
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

  columns: Array<any> = [
    // {
    //   header: 'Open',
    //   actionType: 'raise-event',
    //   linkText: 'Open',
    //   actionCommand: 'item-group',
    //   actionField: 'codingTaskRequestRecId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    // {
    //   header: 'Task ID',
    //   field: 'codingTaskRequestRecId',
    //   align: 'right'
    // },
    {
      header: 'Open',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkPath: 'item-group' //working
    },
    {
      header: 'Coding Category',
      field: 'codingTaskCategoryPDescription'
    },

    {
      header: 'Coding Detail',
      field: 'codingTaskDetail',
      width: 30
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
      header: 'Primary Coding Specialist',
      field: 'codingSpecialistAssignedToDisplayName'
    },
    {
      header: '	Secondary Coding Specialist',
      field: 'secondaryCodingSpecialistAssignedToDisplayName'
    },
    {
      header: 'Requestor',
      field: 'requestorDisplayName'
    },
    {
      header: 'Version',
      field: 'versionNumber'
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

  override ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
