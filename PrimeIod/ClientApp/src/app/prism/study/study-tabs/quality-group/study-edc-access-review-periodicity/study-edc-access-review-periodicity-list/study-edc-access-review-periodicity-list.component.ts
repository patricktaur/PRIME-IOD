import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-edc-access-review-periodicity-list',
  templateUrl: './study-edc-access-review-periodicity-list.component.html',
  styleUrls: ['./study-edc-access-review-periodicity-list.component.css']
})
export class StudyEdcAccessReviewPeriodicityListComponent extends StudyListBase implements OnInit {
  override title = ''; //'EDC User Access Review';
  override controllerName = 'TblStudyEdcAccessReviewPeriodicity';
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
      header: 'Review Number',
      field: 'reviewNumber',
      type: 'number',
      align: 'right'
    },
    {
      header: 'EDC Access Review Periodicity *',
      field: 'edcaccessReviewPeriodicity',
      type: 'number',
      align: 'right'
    },
    {
      header: 'User Access Review Group',
      field: 'userAccessReviewGroupNavigationDescription'
    },
    {
      header: 'Review Status',
      field: 'reviewStatusNavigationDescription'
    },
    {
      header: 'Date Review Completed',
      field: 'dateReviewCompleted',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Remediation Completed',
      field: 'remediationCompletedNavigationDescription'
    }
  ];
}
