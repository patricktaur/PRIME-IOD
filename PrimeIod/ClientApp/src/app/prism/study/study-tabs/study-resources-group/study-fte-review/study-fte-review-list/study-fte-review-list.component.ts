import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';

import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-fte-review-list',
  templateUrl: './study-fte-review-list.component.html',
  styleUrls: ['./study-fte-review-list.component.css']
})
export class StudyFteReviewListComponent extends StudyListBase implements OnInit {
  override title = 'FTE Review';
  override controllerName = 'TblFteReview'; //***Todo***
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  hasDMManagerRole: boolean = false;

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
    // console.log(`studyId = ${ this.studyId }`);
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
      header: 'Review Type',
      field: 'reviewTypeDescription'
    },
    {
      header: 'Date Entered',
      field: 'dateEntered',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Entered By',
      field: 'enteredByDisplayName'
    },
    {
      header: 'DMPM FTE',
      field: 'dmpmfte',
      type: 'number',
      format: '2.2-2',
      align: 'center'
    },
    {
      header: 'CDL FTE',
      field: 'cdlfte',
      type: 'number',
      format: '2.2-2',
      align: 'center'
    },
    {
      header: 'CDC FTE',
      field: 'cdcfte',
      type: 'number',
      format: '2.2-2',
      align: 'center'
    },
    {
      header: 'Programmer FTE',
      field: 'programmerFte',
      type: 'number',
      format: '2.2-2',
      align: 'center'
    },
    {
      header: 'Total',
      field: 'totalFte',
      type: 'number',
      format: '2.2-2',
      align: 'center'
    }
  ];
}
