import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-edc-access-review-periodicity-edit',
  templateUrl: './study-edc-access-review-periodicity-edit.component.html',
  styleUrls: ['./study-edc-access-review-periodicity-edit.component.css']
})
export class StudyEdcAccessReviewPeriodicityEditComponent extends StudyEditBase implements OnInit {
  title = 'EDC User Access Review';
  override controllerName = 'TblStudyEdcAccessReviewPeriodicity';

  userAccessGroupParId = 6700;
  reviewStatusParId = 6800;
  remediationCompletedParId = 6900;

  constructor(
    public override route: ActivatedRoute,
    public override router: Router,
    private tblParamService: TblParamService //for user with filter dropdown values:
  ) {
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
      key: 'edcaccessReviewPeriodicity',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'EDC Access Review Periodicity',
        disabled: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'reviewNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Review Number',
        required: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'userAccessReviewGroup',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'User Access Review Group',
        required: true,
        options: this.tblParamService.getParams(this.userAccessGroupParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'reviewStatus',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Review Status',
        required: true,
        options: this.tblParamService.getParams(this.reviewStatusParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dateReviewCompleted',
      type: 'date-picker',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Date Review Completed',
        required: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'remediationCompleted',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Remediation Completed',
        required: true,
        options: this.tblParamService.getParams(this.remediationCompletedParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    }
  ];
}
