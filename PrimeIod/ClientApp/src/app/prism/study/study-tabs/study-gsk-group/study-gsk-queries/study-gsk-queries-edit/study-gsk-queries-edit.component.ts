import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user

//for user with filter dropdown values:
//import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-gsk-queries-edit',
  templateUrl: './study-gsk-queries-edit.component.html',
  styleUrls: ['./study-gsk-queries-edit.component.css']
})
export class StudyGskKpiDashboardQueryEditComponent extends StudyEditBase implements OnInit {
  title = 'GSK Kpi Query';
  override controllerName = 'TblGskKpiDashboardQuery';

  constructor(
    public override route: ActivatedRoute,
    public override router: Router //for user with filter dropdown values:
  ) //private tblParamService: TblParamService
  {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  //example overload:
  // addOrUpdate() {
  //   //code before update
  //   super.addOrUpdate();
  // }

  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      // fieldGroupClassName: 'study-status-form',
      fieldGroup: [
        {
          // fieldGroupClassName: 'row study-status-form',
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 ',
              template: '<label >Average # of days from query response to closure</label>'
            },
            {
              className: 'col-2',

              key: 'averageNoDays',
              type: 'input',

              templateOptions: {
                type: 'number'
              }
            },
            {
              className: 'col-4',

              key: 'averageNoDaysComment',
              type: 'textarea',

              templateOptions: {
                rows: 3
              }
            }
          ]
        },
        {
          // fieldGroupClassName: 'row study-status-form',
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 ',
              template: '<label ># of days it has taken from query response to closure</label>'
            },
            {
              className: 'col-2',

              key: 'noOfDaysTaken',
              type: 'input',

              templateOptions: {
                type: 'number'
              }
            },
            {
              className: 'col-4',

              key: 'noOfDaysTakenComment',
              type: 'textarea',

              templateOptions: {
                rows: 3
              }
            }
          ]
        },
        {
          // fieldGroupClassName: 'row study-status-form',
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 ',
              template:
                '<label ># of days it has taken for the first DM query to be posted from the date of data entry complete for the data point</label>'
            },
            {
              className: 'col-2',

              key: 'dataPoint',
              type: 'input',

              templateOptions: {
                type: 'number'
              }
            },
            {
              className: 'col-4',

              key: 'dataPointComment',
              type: 'textarea',

              templateOptions: {
                rows: 3
              }
            }
          ]
        }
      ]
    }

    //---
  ];
}
