import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CdsInstrPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-instr-pagination-and-filters';
import { StudyCdsInstFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-filter.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-cds-inst-task-list',
  templateUrl: './study-cds-inst-task-list.component.html',
  styleUrls: ['./study-cds-inst-task-list.component.css']
})
export class StudyCDSInstTaskListComponent extends StudyListBase implements OnInit {
  override title = 'StudyCDSInstTask';
  // controllerName = 'vwCDSInstructionTaskV2';
  // actionName = 'report-list';

  override controllerName = 'TblInstructionRequest';
  override actionName = 'records';

  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  selectedFilters: CdsInstrPaginationAndFilters | any;
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
    private studyCdsInstFilterService: StudyCdsInstFilterService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  // constructor(private studycdsinsttaskEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
    this.studyCdsInstFilterService.filters.subscribe((filters: CdsInstrPaginationAndFilters) => {
      if (filters) {
        this.selectedFilters = filters;
      }
    });

    this.subscription = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      this.studyType = stProp.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/programming-instructions/item-group/edit';
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
    this.studyCdsInstFilterService.setFilters(filters);
  }

  onResetFilters() {
    this.studyCdsInstFilterService.resetFilters();
  }

  pageOptionsChanged(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions?.pageNumber;
    this.selectedFilters.pageSize = pageOptions?.pageSize;
    this.studyCdsInstFilterService.setFilters(this.selectedFilters);
  }

  //***Todo***

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
        (n: any) => this.selectedFilters?.taskCategory.indexOf(n.programmingTaskPDescription) != -1
      );
    }

    return filter2;

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
    //   actionField: 'instructionTaskRequestRecId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    // {
    //   header: 'Task ID',
    //   field: 'instructionTaskRequestRecId',
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
      header: 'Program Detail',
      field: 'programName',
      width: 30
    },

    {
      header: 'Programming Task Category',
      field: 'programmingTaskPDescription'
    },
    {
      header: 'On Scheduler',
      field: 'onSchedulerPid'
    },

    // {
    //   header: 'CDP',
    //   field: 'cdpPDisplayName'
    // },
    {
      header: 'CDPL',
      field: 'cdplPDisplayName'
    },
    {
      header: 'Created Date',
      field: 'createdOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
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
