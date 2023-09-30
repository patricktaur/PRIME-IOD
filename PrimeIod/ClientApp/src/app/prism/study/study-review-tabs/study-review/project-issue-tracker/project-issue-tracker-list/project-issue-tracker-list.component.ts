import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-project-issue-tracker-list',
  templateUrl: './project-issue-tracker-list.component.html',
  styleUrls: ['./project-issue-tracker-list.component.css']
})
export class ProjectIssueTrackerListComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  title = ''; //'Issue Tracker';
  controllerName = 'tblStudyIssueTracker';
  messageFieldForDelete = 'issueCategoryPDescription';

  studyId: number = 0;
  issueTracker: any;

  pageNumber = 1;
  pageSize = 50;

  records: any;

  hasDMManagerRole: boolean = false;

  studyIdSub: Subscription | undefined;
  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.studyIdSub = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      // if (this.studyId > 0) {
      //   this.loadIssueTracker(this.studyId);
      // }
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
      
    });
  }

  hasViewRole() { 
    return !this.hasEditRole();
  }

  hasEditRole() {
    // const hasAdminRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.Admin);
    const hasAdminRole = this.credentialsService.userRoles.includes(UserRoles.Admin);
    
    const hasDMPMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    const hasDMPMRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
    const hasCDLRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
    return hasAdminRole || hasDMPMManagerRole || hasDMPMRole || hasCDLRole;
  }

  columns: Array<any> = [
    {
      header: 'Issue Category',
      field: 'issueCategoryPDescription'
    },
    {
      header: 'Issue Description',
      field: 'issueDescription'
    },
    {
      header: 'Planned Corrective Action (CA)',
      field: 'correctiveActionPlanned',
      width: 50
    },
    {
      header: 'Target Date for CA',
      field: 'targetDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Status after CA',
      field: 'statusNavigationDescription'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
  }
}
