import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
// import { StudyEditAService } from '@app/prism/study/study-edit.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-cdms-cppc-list',
  templateUrl: './cdms-cppc-list.component.html',
  styleUrls: ['./cdms-cppc-list.component.css']
})
export class CdmsCppcListComponent extends StudyListBase implements OnInit {
  override title = 'CdmsCppc';
  override controllerName = 'TblStudyCdmsChildRecords';
  override actionName = 'records-x';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';
  // hasDMManagerRole: boolean = false;

  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  constructor(public override actRoute: ActivatedRoute, 
    public override studyEditService: StudyEditService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  // constructor(private cdmscppcEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
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

  //***Todo***
  columns: Array<any> = [
    //change not permitted - email from Siobhan - 26Jul2022.
    // {
    //   header: 'Edit',
    //   actionType: 'raise-event',
    //   linkText: 'Edit',
    //   actionCommand: 'edit',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    // {
    //   header: 'Delete',
    //   actionType: 'raise-event',
    //   linkText: 'Delete',
    //   actionCommand: 'delete',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    {
      header: 'CPPC Number (from CPPCRF)',
      field: 'cppcNumberFromCppcrf',
      align: 'center'
    },
    {
      header: 'CPPC Reason',
      field: 'cppcReasonPDescription'
    },
    {
      header: 'Edit Checks Completed (CPPC)',
      field: 'editChecksCompletedCppc',
      align: 'center'
    },

    {
      header: 'Date CPPC Completed',
      field: 'dateCppcCompleted',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];
}
