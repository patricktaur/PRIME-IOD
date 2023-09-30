import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-tmf-qc-list',
  templateUrl: './study-tmf-qc-list.component.html',
  styleUrls: ['./study-tmf-qc-list.component.css']
})
export class StudyTmfQcListComponent extends StudyListBase implements OnInit {
  override title = ''; //'StudyTmfQc';
  override controllerName = 'TblStudyTmfqc';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';
  // hasDMManagerRole: boolean = false;
  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  constructor(public override actRoute: ActivatedRoute, 
    public override studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {
    super(actRoute, studyEditService);
  }

  // constructor(private studytmfqcEditService: StudyEditAService) {}

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
    {
      header: 'Edit',
      actionType: 'raise-event',
      linkText: 'Edit',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    {
      header: 'Delete',
      actionType: 'raise-event',
      linkText: 'Delete',
      actionCommand: 'delete',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    {
      header: 'TMF QC Expected Start Date',
      field: 'expectedStartDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'QC Status',
      field: 'qcStatus'
    },
    {
      header: 'TMF QC Expected Completion Date',
      field: 'expectedCompletionDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Region',
      field: 'region'
    },
    {
      header: 'TMF QC Actual Completion Date ',
      field: 'actualCompletionDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'TMF QC Comments',
      field: 'comments'
    }
  ];
}
