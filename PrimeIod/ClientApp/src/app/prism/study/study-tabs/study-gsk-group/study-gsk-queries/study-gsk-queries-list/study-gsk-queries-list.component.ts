import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-gsk-queries-list',
  templateUrl: './study-gsk-queries-list.component.html',
  styleUrls: ['./study-gsk-queries-list.component.css']
})
export class StudyGskKpiDashboardQueryListComponent extends StudyListBase implements OnInit {
  override title = '';
  override controllerName = 'TblGskKpiDashboardQuery';
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  constructor(public override actRoute: ActivatedRoute, public override studyEditService: StudyEditService) {
    super(actRoute, studyEditService);
  }

  // constructor(private studygskkpidashboardqueryEditService: StudyEditAService) {}

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
      header: 'Average # of days from query response to closure',
      field: 'averageNoDays'
    },
    {
      header: '# of days it has taken from query response to closure',
      field: 'noOfDaysTaken'
    },
    {
      header:
        '# of days it has taken for the first DM query to be posted from the date of data entry complete for the data point',
      field: 'dataPoint'
    }
  ];
}
