import { Component, OnInit } from '@angular/core';
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
  selector: 'app-create-requests-edit',
  templateUrl: './create-requests-edit.component.html',
  styleUrls: ['./create-requests-edit.component.css']
})
export class CreateRequestsEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Request for new User';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  // F: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;

  OperatingDivisionParId = 2900;
  OfficeRegionParId = 3000;
  OfficeCountryParId = 3100;
  RoleParId = 1800; //yet to plan

  yesNoItems: any = null;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
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
    this.currentUser = this.credSerivce.currentUser;
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        let studyId = params.studyId;

        this.loadNewRecord(studyId);
        this.title = this.title + ' -create';
      } else {
        this.recId = params.id;
        this.loadRecord(this.recId);
        this.title = this.title + ' -modify';
      }
    });
  }
  loadNewRecord(studyId: any) {
    this.loading = true;
    this.loadNewRecordSub = this.requestsService.CreateRequestUserNew().subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.record.createdById = this.credSerivce.currentUser.id;
          this.record.updatedById = this.credSerivce.currentUser.id;
          this.record.requestedBy = this.credSerivce.currentUser.fullName;
          this.submitForApprovalButton = true;
          this.saveButton = true;
          this.removeButton = false;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.requestsService.CreateRequestUserEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;

          if (this.record.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
            this.saveButton = true;
            this.submitForApprovalButton = true;
          }
          this.removeButton = false;
          if (this.record?.recId > 0 && this.record.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
            this.removeButton = true;
          }
          if (this.record.isActioned == 1 && this.currentUserIsLastUpdatedByUser()) {
            this.withdrawRequestButton = true;
          }
          if (this.saveButton == false) {
            this.title = 'Submitted';
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

  showOtherUserAlert() {
    return this.record?.recId > 0 && //update
      !this.currentUserIsLastUpdatedByUser() &&
      (this.record.isActioned == 0 || this.record.isActioned == 1) //not submitted
      ? true
      : false;

    return;
  }

  currentUserIsLastUpdatedByUser() {
    return true;
    // return this.currentUser.id === this.record?.updatedById ? true : false;
  }

  addOrUpdate() {
    this.loading = true;
    console.log(`record = ${JSON.stringify(this.record, null, 2)}`);

    this.addUpdateSub = this.requestsService.CreateRequestUserAddorUpdate(this.record).subscribe(
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

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Study Request.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  canSave() {
    if (this.form.dirty && this.record.displayName) {
      return true;
    } else {
      return false;
    }
  }
  submit() {
    // if (this.form.dirty) {
    //   this.addOrUpdate();
    // }
    if (this.canSave()) {
      this.addOrUpdate();
    }
  }

  submitForApproval() {
    if (this.form.valid) {
      this.loading = true;

      this.addUpdateSub = this.requestsService.CreateRequestUserAddorUpdateandSend(this.record).subscribe(
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
  }
  withdrawRequest() {
    if (this.form.valid) {
      this.loading = true;

      this.addUpdateSub = this.requestsService.CreateRequestUserWidthdraw(this.record).subscribe(
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
  }

  deleteRecord(recId: number) {
    this.loading = true;
    this.deleteRecordSub = this.requestsService.CreateRequestUserDelete(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.location.back();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  back() {
    this.location.back();
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
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
       // required: true,
        helpText: 'Enter a Employee ID',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        maxLength:8
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
}
