import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-cdms-tracker-list',
  templateUrl: './study-cdms-tracker-list.component.html',
  styleUrls: ['./study-cdms-tracker-list.component.css']
})
export class StudyCdmsTrackerListComponent extends StudyListBase implements OnInit {
  override title = 'Study CDMS Tracker';
  override controllerName = 'TblCdmsTasksTimelinesTrackerMainRecords';
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

  // hasDMManagerRole: boolean = false;
  // mode: string = "";
  // isViewMode: boolean = false;
  // showFooterActions: boolean = false; //not used, can be removed.

  studyType = ""
  menuAccessLink = "";
  subscription: Subscription | undefined;

  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    @Inject('cdms-tracker') private serverResponseService: ServerResponseService,
    private credentialsService: CredentialsService,
  ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    super.ngOnInit();

    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyType = st.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cdms-group/cdms-tracker/item-group/edit';
    });
   
    
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    // //alert("Director: "+ this.hasDMManagerRole);
    // //alert(this.credentialsService.userRoles);
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userRoles.includes(UserRoles.Admin);
    //  // alert("Admin: " +this.hasDMManagerRole);
    // }
    
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
    //   //alert("DMPM: "+this.hasDMManagerRole);
    // }
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
    //  // alert("CDL: "+this.hasDMManagerRole);
    // }

    // if(this.hasDMManagerRole!=true){
    //   this.isViewMode = true;
    //   }

    

  }

  hasViewRole() { 
    return !this.hasEditRole
  }

  hasEditRole() {
    // const hasAdminRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.Admin);
    const hasAdminRole = this.credentialsService.userRoles.includes(UserRoles.Admin);
    
    const hasDMPMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    const hasDMPMRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
    const hasCDLRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
    return hasAdminRole || hasDMPMManagerRole || hasDMPMRole || hasCDLRole;
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
      linkPath: 'item-group', //working
      // hide:this.isViewMode
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

  override ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
