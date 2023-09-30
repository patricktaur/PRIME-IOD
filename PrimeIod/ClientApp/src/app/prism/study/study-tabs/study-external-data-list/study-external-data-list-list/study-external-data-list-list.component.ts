import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-external-data-list-list',
  templateUrl: './study-external-data-list-list.component.html',
  styleUrls: ['./study-external-data-list-list.component.css']
})
export class StudyExternalDataListListComponent extends StudyListBase implements OnInit {
  override title = 'External Data';
  override controllerName = 'tblExternalData'; //***Todo***
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

   hasDMManagerRole: boolean = false;
  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  constructor(public override actRoute: ActivatedRoute, 
    public override studyEditService: StudyEditService,
    private credentialsService: CredentialsService,
    ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    //   //alert(this.credentialsService.userRoles);
    //   if(this.hasDMManagerRole!=true){
    //     this.hasDMManagerRole = this.credentialsService.userRoles.includes(UserRoles.Admin);

    //   }
    //   if(this.hasDMManagerRole!=true){
    //     this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
    //   }
    //   if(this.hasDMManagerRole!=true){
    //     this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
    //   }
     
    //   if(this.hasDMManagerRole!=true){
    //   this.isViewMode = true;
    //   }
  
   }

   
  get hasViewRole() { 
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
      header: 'Edit',
      actionType: 'raise-event',
      linkText: 'Edit',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'XXXX' // this?.messageFieldForDelete
    },
    {
      header: 'Delete',
      actionType: 'raise-event',
      linkText: 'Delete',
      actionCommand: 'delete',
      actionField: 'recId',
      actionTextField: 'XXXX' // this?.messageFieldForDelete
    },
    {
      header: 'Task Id',
      field: 'taskId'
    },
    {
      header: 'Data Type',
      field: 'dataTypeDescription'
    },
    {
      header: 'Vendor name',
      field: 'vendorNameDescription'
    },

    {
      header: 'No. of Files Expected',
      field: 'noOfFilesExpectedId'
    },
    {
      header: 'Frequency of Transfer',
      field: 'frequencyOfTransferId'
    },
    {
      header: 'DTS Status',
      field: 'dtsstatusId'
    },
    {
      header: 'Location of DTS',
      field: 'locationOfDts'
    },
    {
      header: 'Test Transfer Status',
      field: 'testTransferStatusId'
    },
    {
      header: 'Test Transfer Date',
      field: 'testTransferDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Production Transfer Date',
      field: 'productionTransferDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Reconciliation Listing Status',
      field: 'reconciliationListingStatusId'
    },
    {
      header: 'Vendor Issue Tracking Log',
      field: 'vendorIssueTrackingLog'
    },
    {
      header: 'Unblinded Transfer Required',
      field: 'bindedTransferRequiredId'
    }
  ];
}
