import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-study-audit-trail-review-edit',
  templateUrl: './study-audit-trail-review-edit.component.html',
  styleUrls: ['./study-audit-trail-review-edit.component.css']
})
export class StudyAuditTrailReviewEditComponent extends StudyEditBase implements OnInit {
  title = 'Audit Trail Review';
  override controllerName = 'TblStudyAuditTrailReview';

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
      key: 'auditTrailPeriodicity',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Audit Trail Periodicity',
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

    // {
    //   key: 'userAccessReviewGroup',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'User Access Review Group',
    //     required: true,
    //     options: this.tblParamService.getParams(this.userAccessGroupParId),
    //     placeholder: '-Select-',
    //     valueProp: 'recId',
    //     labelProp: 'description',
    //     labelColClassName: 'col-5',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
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
    }
  ];
}
