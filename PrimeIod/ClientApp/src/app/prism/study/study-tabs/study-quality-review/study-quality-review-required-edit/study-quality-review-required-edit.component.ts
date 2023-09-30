import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user

import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { StudyEditService } from '@app/prism/study/study-edit.service';

import { StudyQualityReviewService } from '@app/prism/study/study-tabs/study-quality-review/study-quality-review.service';
//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-quality-review-required-edit',
  templateUrl: './study-quality-review-required-edit.component.html',
  styleUrls: ['./study-quality-review-required-edit.component.css']
})
export class StudyQualityReviewRequiredEditComponent implements OnInit {
  form = new FormGroup({});
  title = 'Quality Review';
  studyId: any;
  yesNoParId = 600;
  loading: boolean = false;

  record: any;
  hasDMManagerRole: boolean = false;

  constructor(
    private studyEditService: StudyEditService,
    private studyQualityReviewService: StudyQualityReviewService,
    private tblParamService: TblParamService, //private tblParamService: TblParamService
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadRecord(this.studyId);
      }
    });
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.studyQualityReviewService.GetTblStudyQrMaster(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.form.reset();

          this.record = res;

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  saveQrMaster() {
    this.loading = true;
    this.studyQualityReviewService.addOrUpdateQrMaster(this.record).subscribe(
      res => {
        this.form.reset();
        this.record = res;

        this.loading = false;
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  submit() {
    if (this.form.valid) {
      this.saveQrMaster();
    }
  }

  /*
recId": 1, "createdOn": "2022-02-01T17:58:34.297", 
"createdById": 2, "updatedOn": "2022-02-01T17:58:34.297", 
"updatedById": 2, "deletedOn": null, "deletedById": null, 
"qrrequired": 602, "justificationComments": "XCXXC", 
"studyId": 2019, "qrrequiredNavigationDescription": "No" }
  */
  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'qrrequired',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Is QR Required',
        required: true,
        options: this.tblParamService.getParams(this.yesNoParId),
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
      key: 'justificationComments',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Please Provide Justification',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.required': x => x.qrrequired == 602
      },
      validation: {
        show: true
      }
    }
  ];
}
