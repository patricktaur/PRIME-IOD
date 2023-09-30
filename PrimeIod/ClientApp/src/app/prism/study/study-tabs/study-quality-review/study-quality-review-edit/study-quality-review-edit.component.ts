import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user

import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyQualityReviewService } from '@app/prism/study/study-tabs/study-quality-review/study-quality-review.service';

@Component({
  selector: 'app-study-quality-review-edit',
  templateUrl: './study-quality-review-edit.component.html',
  styleUrls: ['./study-quality-review-edit.component.css']
})
export class StudyQualityReviewEditComponent extends StudyEditBase implements OnInit {
  title = 'Quality Review';
  override controllerName = 'tblStudyQR';

  qrTypeParId = 3600;
  qrStatusParId = 3700;

  constructor(
    public override route: ActivatedRoute,
    public override router: Router,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private studyQualityReviewService: StudyQualityReviewService //private tblParamService: TblParamService //for user with filter dropdown values:
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

  /*
record: { "recId": 4215, "createdOn": "2022-02-01T18:00:44.627", 
"createdById": 2, "updatedOn": "2022-02-01T18:00:44.627", "updatedById": 2, 
"deletedOn": null, "deletedById": null, "pocIndiaUid": 188, 
"managerIndiaUid": 1066, "qrTypePid": 3603, "qrTimestamp": 20, 
"qrExpectedStartDate": "2022-02-01T00:00:00", "sizeOfRandomSampleSubjects": 3, 
"expectedNumberOfQueriesRows": 4, "dmpmCommentOnQr": "5", 
"expectedTimelineForQrCompletion": "2022-02-03T00:00:00", 
"qrStatusPid": 3701, "qrLeadComment": "9", "studyId": 2019, "qrErrorRate": 7, 
"actualQrErrorRate": 8, "qrActualStartDate": "2022-02-02T00:00:00", 
"qrActualCompletionDate": "2022-02-04T00:00:00", "errorThreshold": 6, 
"managerIndiaU": null, 
"pocIndiaU": null, "qrStatusP": null, "qrTypeP": null, "study": null }
*/

  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'pocIndiaUid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'POC (India)',
        required: true,
        options: this.tblUserService.getUsers(),
        valueProp: 'id',
        labelProp: 'value',
        placeholder: '-Select-',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'managerIndiaUid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Manager (India)',
        options: this.tblUserService.getUsers(),
        valueProp: 'id',
        labelProp: 'value',
        placeholder: '-Select-',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrTypePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Type',
        required: true,
        options: this.tblParamService.getParams(this.qrTypeParId),
        valueProp: 'recId',
        labelProp: 'description',
        placeholder: '-Select-',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrTimestamp', //qrTimestamp
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Timestamp',
        required: true,
        options: this.studyQualityReviewService.TimeStampValues(),
        valueProp: 'id',
        labelProp: 'value',
        placeholder: '-Select-',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrExpectedStartDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Expected Start Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrActualStartDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Actual Start Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'sizeOfRandomSampleSubjects',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Size of Random Sample (Subjects)',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'expectedNumberOfQueriesRows',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Expected number of Queries/Rows',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dmpmCommentOnQr',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DMPM Comment on QR',
        rows: 3,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'expectedTimelineForQrCompletion',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Expected Timeline for QR Completion',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrActualCompletionDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Actual Completion Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrStatusPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Status',
        required: true,
        options: this.tblParamService.getParams(this.qrStatusParId),
        valueProp: 'recId',
        labelProp: 'description',
        placeholder: '-Select-',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'errorThreshold',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Error Threshold',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrErrorRate',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Error Rate %',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'actualQrErrorRate',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Actual QR Error Rate %',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qrLeadComment',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QR Lead Comment',
        rows: 3,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    }
  ];
}
