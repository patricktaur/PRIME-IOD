import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-gsk-amendments-list',
  templateUrl: './study-gsk-amendments-list.component.html',
  styleUrls: ['./study-gsk-amendments-list.component.css']
})
export class StudyGskKpiDashboardProtocolAmendmentsListComponent extends StudyListBase implements OnInit {
  override title = '';
  override controllerName = 'TblGskKpiDashboardProtocolAmendment';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  constructor(public override actRoute: ActivatedRoute, public override studyEditService: StudyEditService) {
    super(actRoute, studyEditService);
  }

  // constructor(private studygskkpidashboardprotocolamendmentsEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
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
      header: 'Protocol Amendment signoff Date',
      field: 'protocolAmendmentSignoff',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Protocol Amendment Number',
      field: 'protocolAmendmentNumber'
    }
  ];
}
