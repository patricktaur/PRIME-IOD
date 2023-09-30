import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user

//for user with filter dropdown values:
//import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-gsk-amendments-edit',
  templateUrl: './study-gsk-amendments-edit.component.html',
  styleUrls: ['./study-gsk-amendments-edit.component.css']
})
export class StudyGskKpiDashboardProtocolAmendmentsEditComponent extends StudyEditBase implements OnInit {
  title = 'Protocol Amendments';
  override controllerName = 'TblGskKpiDashboardProtocolAmendment';

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
              className: 'col-4 ',
              template: '<label >Protocol Amendment signoff Date</label>'
            },
            {
              className: 'col-4',

              key: 'protocolAmendmentSignoff',
              type: 'date-picker'
            },
            {
              className: 'col-4',

              key: 'protocolAmendmentSignoffComment',
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
              className: 'col-4 ',
              template: '<label >Protocol Amendment Number</label>'
            },
            {
              className: 'col-4',

              key: 'protocolAmendmentNumber',
              type: 'input',

              templateOptions: {
                type: 'number'
              }
            },
            {
              className: 'col-4',

              key: 'protocolAmendmentNumberComment',
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
