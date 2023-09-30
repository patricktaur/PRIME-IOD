import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-third-party-tracker-list',
  templateUrl: './third-party-tracker-list.component.html',
  styleUrls: ['./third-party-tracker-list.component.css']
})
export class ThirdPartyTrackerListComponent extends StudyListBase implements OnInit {
  override title = 'Clininfo Cdms Tracker'; //'Third Party Tracker';
  override controllerName = 'TblThirdPartyCdmstrackerMainRecords';
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
  // showFooterActions: boolean = false;

  studyType = ""
  menuAccessLink = "";
  subscription: Subscription | undefined;

  constructor(
    public override actRoute: ActivatedRoute,
    public override studyEditService: StudyEditService,
    @Inject('cdms-third-party-tracker') private serverResponseService: ServerResponseService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    super.ngOnInit();

    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyType = st.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cdms-group/third-party-cdms-tracker/item-group/edit';
    });
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    // //alert(this.credentialsService.userRoles);
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userRoles.includes(UserRoles.Admin);
    // }
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
    // }
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
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
    return this.records;
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
    //not found in edit page
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
