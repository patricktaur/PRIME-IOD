import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
@Component({
  selector: 'app-approval-request-edit',
  templateUrl: './approval-request-edit.component.html',
  styleUrls: ['./approval-request-edit.component.css']
})
export class ApprovalRequestEditComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  title = 'Approve Request For New User';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  ApprovedOrRejectedButton: boolean = true;
  saveButton: boolean = false;
  undoRejectButton: boolean = false;

  OperatingDivisionParId = 2900;
  OfficeRegionParId = 3000;
  OfficeCountryParId = 3100;
  RoleParId = 1800; //yet to plan

  yesNoItems: any = null;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;

  addUpdateSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private requestsService: RequestsUserService,
    private credSerivce: CredentialsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        let studyId = params.studyId;

        // this.loadNewRecord(studyId);
        // this.title = 'Create';
      } else {
        this.recId = params.id;
        this.loadRecord(this.recId);
        // this.title = 'Request Task';
      }
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.requestsService.ApprovalRequestUserEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          if (this.record.isActioned == 2 || this.record.isActioned == 3) {
            this.ApprovedOrRejectedButton = false;
          }
          if (this.record.isActioned == 3) {
            this.undoRejectButton = true;
          }

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  approve() {
    this.loading = true;
    this.record.approvedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.ApprovalRequestUserApprove(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  reject() {
    this.loading = true;
    this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.ApprovalRequestUserReject(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  undoReject() {
    this.loading = true;
    this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.ApprovalRequestUserUndoReject(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  back() {
    this.location.back();
  }

  canReject() {
    if (this.ApprovedOrRejectedButton && this.record?.rejectedComments) {
      return true;
    } else {
      return false;
    }
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'requestType',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Request Type',
        hideLabel: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'recId',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Request Id',
        hideLabel: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'displayName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'User Name',
        required: true,
        helpText: 'Enter a User Display Name',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'emailId',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Email ID',
        required: true,
        helpText: 'Enter a User Email ID',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validators: {
        validation: ['emailValidation']
      }
    },
    {
      key: 'employeeId',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Employee ID',
        //required: true,
        helpText: 'Enter a Employee ID',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'enterpriseId',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Enterprise ID',
        required: true,
        helpText: 'Enter a Enterprise ID',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'joiningdate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Joining Date',
        required: true,
        helpText: 'Enter a User Joining Date',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'rolePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Role',
        required: true,

        options: this.tblParamService.getRoles(),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'operatingDivisionPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Operating Division',
        required: true,

        options: this.tblParamService.getParams(this.OperatingDivisionParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'officeRegionPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Office Region',
        required: true,

        options: this.tblParamService.getParams(this.OfficeRegionParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'officeCountryPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Office Country',
        required: true,

        options: this.tblParamService.getParams(this.OfficeCountryParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },

    {
      key: 'timeZoneId',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Time Zone',
        required: true,
        options: this.requestsService.timeZone,
        valueProp: 'value',
        labelProp: 'label',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'month',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Start Date in Clinical Industory',
        required: true,
        helpText: 'Enter a Start Date in Clinical Industory',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    },
    {
      key: 'requesterComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    {
      key: 'approverComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Approve Comment',
        helpText: 'Approver Comment',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'rejectedComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Reject Comment',
        helpText: 'Reject Comment',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      template: '<hr>'
    },
    {
      key: 'requesterComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    {
      key: 'approverComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Approver Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model?.isActioned < 2',

      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    {
      key: 'rejectedComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Rejected Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model?.isActioned < 2',
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    //---
    {
      template: '<hr>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'recId',
          type: 'label',

          templateOptions: {
            label: '  Request Id'
          }
        },
        {
          className: 'col-3',
          key: 'requestType',
          type: 'label',
          templateOptions: {
            label: '  Request Type'
          }
        },
        {
          className: 'col-6',
          key: 'requestStatus',
          type: 'label',
          templateOptions: {
            label: '  Status'
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'requestedOn',
          type: 'label',
          templateOptions: {
            label: 'Request On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          className: 'col-9',
          key: 'requestedBy',
          type: 'label',
          templateOptions: {
            label: 'Requested By'
          }
        }
      ],
      hideExpression: 'model?.isActioned == 0'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'approvedOn',
          type: 'label',
          className: 'col-3',
          templateOptions: {
            label: 'Actioned On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy',
            labelColClassName: 'col-4',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'approvedBy',
          type: 'label',
          className: 'col-9',

          templateOptions: {
            label: 'Actioned by'
          }
        }
      ],
      hideExpression: 'model?.isActioned < 2'
    },
    {
      template: '<hr>'
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
  }
}
