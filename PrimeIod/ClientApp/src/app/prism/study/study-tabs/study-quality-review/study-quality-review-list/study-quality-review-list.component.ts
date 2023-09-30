import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-quality-review-list',
  templateUrl: './study-quality-review-list.component.html',
  styleUrls: ['./study-quality-review-list.component.css']
})
export class StudyQualityReviewListComponent extends StudyListBase implements OnInit {
  override title = ''; //'Quality Review';
  override controllerName = 'tblStudyQR';
  override actionName = 'recordsx';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';
  // hasDMManagerRole: boolean = false;
  isViewMode: boolean = false;
  mode: string = "";
  showFooterActions: boolean = false;

  constructor(public override actRoute: ActivatedRoute, 
    public override studyEditService: StudyEditService,
    private credentialsService: CredentialsService
  ) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];

    this.showFooterActions = this.mode != 'view' ? true : false;
    if (this.mode == 'view') {
      this.isViewMode = true;
      //remove edit - del button columns
      this.columns.splice(0, 2);
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
      header: 'POC (India) ',
      field: 'pocIndiaUDisplayName'
    },
    {
      header: 'Manager (India)',
      field: 'managerIndiaUDisplayName'
    },
    {
      header: 'QR Type',
      field: 'qrTypePDescription'
    },
    {
      header: 'QR Timestamp',
      field: 'qrTimestamp'
    },

    {
      header: 'QR Expected Start Date',
      field: 'qrExpectedStartDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'QR Actual Start Date',
      field: 'qrActualStartDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Size of Random Sample (Subjects)',
      field: 'sizeOfRandomSampleSubjects'
    },
    {
      header: 'Expected number of Queries/Rows',
      field: 'expectedNumberOfQueriesRows'
    },
    {
      header: 'DMPM Comment on QR',
      field: 'dmpmCommentOnQr'
    },
    {
      header: 'Expected Timeline for QR Completion',
      field: 'expectedTimelineForQrCompletion',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'QR Actual Completion Date',
      field: 'qrActualCompletionDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'QR Status',
      field: 'qrStatusPDescription'
    },
    {
      header: 'Error Threshold',
      field: 'errorThreshold'
    },
    {
      header: 'QR Error Rate %',
      field: 'qrErrorRate'
    },
    {
      header: 'Actual QR Error Rate %',
      field: 'actualQrErrorRate'
    },
    {
      header: 'QR Lead Comment',
      field: 'qrLeadComment'
    },
    {
      header: 'Completed By',
      field: 'completedBy'
    },
    {
      header: 'Completed On',
      field: 'completedOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    }
  ];
}
