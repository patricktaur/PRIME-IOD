import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@Component({
  selector: 'app-imi-study-cdms-tracker-list',
  templateUrl: './imi-study-cdms-tracker-list.component.html',
  styleUrls: ['./imi-study-cdms-tracker-list.component.css']
})
export class ImiStudyCdmsTrackerListComponent extends StudyListBase implements OnInit {
  override title = 'IMI Study CDMS Tracker';
  override controllerName = 'TblImicdmsTasksTimelinesTrackerMainRecords';
  override actionName = 'records';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  selectedFilters: any = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: 'task-id',
    sortBy: 'asc',
    sortOn: 'task-id',
    completed: 'no'
  };
  serverResponses: any = [];

  mode: string = "";
  showFooterActions: boolean = false;
  // isViewMode: boolean = false;

  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    @Inject('imi-cdms-tracker') private serverResponseService: ServerResponseService
  ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    super.ngOnInit();

    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];

    this.showFooterActions = this.mode != 'view' ? true : false;
    // if (this.mode == 'view') {
    //   //remove edit - del button columns
    //   this.isViewMode = true;
    // }
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
  }

  get filteredRecords() {
    // "recId": 2638
    return this.records;
    // let searchText = '';
    // searchText = this.selectedFilters?.searchText;
    // searchText = searchText?.toLowerCase();
    // let filter1 = this.records;
    // if (searchText?.length > 0) {
    //   filter1 = null;
    //   filter1 = this.records?.filter(
    //     (x: any) =>
    //       x.codingTaskRequestRecId
    //         .toString()
    //         .toLowerCase()
    //         .indexOf(searchText) != -1
    //   );
    // }

    // let filter2 = filter1;
    // if (this.selectedFilters?.taskCategory && this.selectedFilters?.taskCategory.length > 0) {
    //   filter2 = null;
    //   filter2 = filter1.filter(
    //     (n: any) => this.selectedFilters?.taskCategory.indexOf(n.codingTaskRequestCodingTaskCategory) != -1
    //   );
    // }

    // let filter3 = filter2;
    // if (this.selectedFilters?.dueDateFrom && this.selectedFilters?.dueDateFrom.length > 0) {
    //   filter3 = null;
    //   filter3 = filter2.filter(
    //     (n: any) =>
    //       //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
    //       new Date(n.codingTaskRequestDueDate).getTime() >= new Date(this.selectedFilters?.dueDateFrom).getTime()
    //   );
    // }

    // let filter4 = filter3;
    // if (this.selectedFilters?.dueDateTo && this.selectedFilters?.dueDateTo.length > 0) {
    //   filter4 = null;
    //   filter4 = filter3.filter(
    //     (n: any) =>
    //       //this.selectedFilters?.dueDateFrom.indexOf(n.dueDate) != -1
    //       new Date(n.codingTaskRequestDueDate).getTime() <= new Date(this.selectedFilters?.dueDateTo).getTime()
    //   );
    // }

    // let filter5 = filter4;
    // if (this.selectedFilters?.completed == 'yes') {
    //   filter5 = null;
    //   filter5 = filter4.filter((n: any) => n.codingTaskRequestCompletedDate !== null);
    // }
    // let filter6 = filter5;
    // if (this.selectedFilters?.completed == 'no') {
    //   filter6 = null;
    //   filter6 = filter5.filter((n: any) => n.codingTaskRequestCompletedDate === null);
    // }

    // return filter6;

    // return this.records;
  }

  override add(): void {
    this.router.navigate(['new'], { relativeTo: this.actRoute.parent, state: { studyId: this.studyId, id: 0 } });
  }

  columns: Array<any> = [
    {
      header: 'Open',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkText: 'Open',
      linkPath: 'item-group' //working
    },
    {
      header: 'CPPC Number',
      field: 'cppcNo'
    },
    {
      header: 'Status',
      field: 'cppcStatusNavigationDescription'
    },
    {
      header: 'Edit Checks',
      field: 'numberOfEditChecks',
      align: 'right'
    },
    {
      header: 'CPPC Reason',
      field: 'cppcReasonNavigationDescription'
    },
    {
      header: 'Started On',
      field: 'taskStartedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Planned Completion Date',
      field: 'taskCompletionDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Actual Completion Date',
      field: 'taskCompletedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Task Group',
      field: 'ocTaskGroupTitle'
    },
    {
      header: 'Split GoLive CPPC',
      field: 'splitGoLiveCppcText',
      align: 'center'
    }
    //Field not found in Edit page:
    // {
    //   header: 'Number of CRF Changes',
    //   field: 'xxx',
    //   align: 'center'
    // }
  ];
}
