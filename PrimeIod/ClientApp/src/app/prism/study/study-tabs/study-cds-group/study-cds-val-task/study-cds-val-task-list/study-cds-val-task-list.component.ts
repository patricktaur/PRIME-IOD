import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CdsValPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-val-pagination-and-filters';
import { StudyCdsValFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-filter.service';

@Component({
  selector: 'app-study-cds-val-task-list',
  templateUrl: './study-cds-val-task-list.component.html',
  styleUrls: ['./study-cds-val-task-list.component.css']
})
export class StudyCDSValTaskListComponent extends StudyListBase implements OnInit {
  override title = 'StudyCDSValTask';
  // controllerName = 'TblCdsvalidationRequest';
  override controllerName = 'vwCDSValidationTaskV2';
  override actionName = 'report-list';

  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  selectedFilters: CdsValPaginationAndFilters | any;

  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;
  // any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'task-id',
  //   sortBy: 'asc',
  //   sortOn: 'task-id',
  //   completed: 'no'
  // };
  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    private studyCdsValFilterService: StudyCdsValFilterService
  ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.studyCdsValFilterService.filters.subscribe((filters: CdsValPaginationAndFilters) => {
      if (filters) {
        this.selectedFilters = filters;
      }
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
  // constructor(private studycdsvaltaskEditService: StudyEditAService) {}
  onFilterChange(filters: any) {
    this.selectedFilters = filters;
    this.studyCdsValFilterService.setFilters(filters);
  }

  onResetFilters() {
    this.studyCdsValFilterService.resetFilters();
  }

  pageOptionsChanged(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions?.pageNumber;
    this.selectedFilters.pageSize = pageOptions?.pageSize;
    this.studyCdsValFilterService.setFilters(this.selectedFilters);
  }

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
          x.validationTaskReqDevReqTaskId
            .toString()
            .toLowerCase()
            .indexOf(searchText) != -1
      );
    }

    let filter2 = filter1;
    if (this.selectedFilters?.developmentTaskCategory && this.selectedFilters?.developmentTaskCategory.length > 0) {
      filter2 = null;
      filter2 = filter1.filter(
        (n: any) => this.selectedFilters?.developmentTaskCategory.indexOf(n.validationTaskReqDevCategory) != -1
      );
    }

    return filter2;

    // return this.records;
  }
  override add(): void {
    //this.router.navigate(['/b'], {state: {data: {...}}});
    this.router.navigate(['new'], { relativeTo: this.actRoute.parent, state: { studyId: this.studyId, id: 0 } });
    //relativeTo: this.actRoute.parent
  }

  /*
records: [ { "recId": 2, "createdOn": "2022-04-14T15:38:31.267", "createdById": 2, "updatedOn": "2022-04-14T15:38:31.267", "updatedById": 2, "deletedOn": null, "deletedById": null, "developmentRequestTaskId": "4660 ", "validationStatus": 601, "validationTaskInvolved": null, "validationStartDate": null, "validationEndDate": null, "finalValidationRound": null, "totalProgIssues": null, "totalSpecIssues": null, "linkToValDocuments": null, "comments": null, "validationPoc": null, "validationMembers": null, "validationDueDate": null, "totalValIssues": null, "history": null, "currentValidationRound": null, "validationStatusPDescription": "Yes" } ]
*/
  //***Todo***
  columns: Array<any> = [
    {
      header: 'Task Id',
      field: 'validationTaskReqDevReqTaskId', //Displays Parent TableId.
      actionType: 'link',
      linkField: 'validationTaskReqRecId', //Accesses RecId
      linkPath: 'item-group' //working
    },

    {
      header: 'Development Task Category',
      field: 'validationTaskReqDevCategory',
      width: 50
    },
    {
      header: 'Development Task Detail',
      field: 'validationTaskReqDevDetail',
      width: 50
    },
    {
      header: 'Is this an update to an existing Program',
      field: 'validationTaskReqIsThisAProgrammingPPC'
    },

    {
      header: 'Is this output to be uploaded to DRT',
      field: 'developmentTaskRequestIsThisaProgrammingPpc',
      width: 50
    },
    {
      header: 'No. of Units',
      field: 'validationTaskReqNoOfUnits'
    },
    {
      header: 'Development Status',
      field: 'validationTaskReqDevStatus'
    },
    {
      header: 'Validation Status',
      field: 'validationTaskReqValidationStatus'
    },
    {
      header: 'Current Validation Round',
      field: 'validationTaskReqCurrentValidationRound'
    },
    {
      header: 'Validation Task Involved',
      field: 'validationTaskReqValidationTaskInvolved'
    },

    {
      header: 'Validation Start Date',
      field: 'validationTaskReqValidationStartDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Validation End Date',
      field: 'validationTaskReqvalidationEndDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Final Validation round',
      field: 'validationTaskReqFinalValidatoinRound'
    },
    {
      header: 'Total Prog Issues',
      field: 'validationTaskReqTotalProgIssues'
    },
    {
      header: 'Total Spec Issues',
      field: 'validationTaskReqTotalSpecIssues'
    },
    {
      header: 'Total Val Issues',
      field: 'validationTaskReqTotalValIssues'
    },
    {
      header: 'Link to Val Documents',
      field: 'validationTaskReqLinkToValDoc',
      width: 50
    },
    {
      header: 'Validation POC',
      field: 'validationTaskReqValidatonPOC',
      width: 50
    },
    {
      header: 'Validation Members',
      field: 'validationTaskReqValidationMembers'
    },
    {
      header: 'Validation Due Date',
      field: 'validationTaskReqDevDueDat',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Programming Due Date',
      field: 'developmentTaskRequestDueDate', //field not found
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },

    {
      header: 'Requestor',
      field: 'validationTaskReqRequestor',
      width: 50
    },

    {
      header: 'Programmer Assigned',
      field: 'validationTaskReqProgrammerAssignedToName',
      width: 50
    },

    {
      header: 'Last Saved By',
      field: 'validationTaskReqLastSavedByName', //view changes required to get name
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'validationTaskReqLastSavedOn',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];
}
