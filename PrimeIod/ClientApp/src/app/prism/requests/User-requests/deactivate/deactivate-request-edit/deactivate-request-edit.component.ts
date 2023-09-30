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
import { UserEdit } from '@app/core/models/user-edit.model';
import { CredentialsService } from '@app/core/authentication/credentials.service';
@Component({
  selector: 'app-deactivate-request-edit',
  templateUrl: './deactivate-request-edit.component.html',
  styleUrls: ['./deactivate-request-edit.component.css']
})
export class DeactivateRequestEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Request to deactivate User';
  // controllerName = 'TblRequestStudy';
  userId: number = 0;
  showUserSelectDropDown = true;
  userSelectDropDownDisabled = false;
  form : FormGroup = new FormGroup({});
  form1 : FormGroup = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;
  record1: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;
  DisplayCreateForm: boolean = false;
  DisplaySearchForm: boolean = false;
  disableRequestorComment: boolean = false;

  OperatingDivisionParId = 2900;
  OfficeRegionParId = 3000;
  OfficeCountryParId = 3100;
  RoleParId = 1800; //yet to plan

  yesNoItems: any = null;

  users: any;

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
        this.loadUsers();
        this.loadNewRecord();

        this.title = this.title + ' -create';
      } else {
        this.DisplaySearchForm = false;
        this.DisplayCreateForm = true;
        this.recId = params.id;
        this.loadRecord(this.recId);
        this.title = this.title + ' -modify';
      }
    });
  }

  loadUsers() {
    this.tblUserService.getUsers().subscribe((users: any) => {
      this.users = users as any[];
    });
  }

  onUserSelected(value: any) {
    this.userId = value;
    this.record.pid = value;
    //  this.loadNewRecord(value);
  }

  loadNewRecord() {
    this.loadNewRecordSub = this.requestsService.DeactivateRequestUserNew().subscribe((newRec: any) => {
      this.record = newRec;
      this.setButtonVisibility(this.record);
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.requestsService.DeactivateRequestUserEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.userId = this.record.pid;
          this.setButtonVisibility(this.record);
          // if (this.record?.isActioned == 0) {
          //   this.saveButton = true;
          //   this.submitForApprovalButton = true;
          // }
          // if (this.record?.isActioned == 1) {
          //   this.saveButton = false;
          //   this.withdrawRequestButton = true;
          // }
          // if (this.saveButton == false) {
          //   this.title = 'Submitted';
          // }
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  setButtonVisibility(record: any) {
    if (record && !record?.isActioned) {
      record.isActioned = 0;
    }
    if (record?.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
      this.saveButton = true;
      this.submitForApprovalButton = true;
    }
    if (record?.isActioned != 0) {
      this.userSelectDropDownDisabled = true;
      this.disableRequestorComment = true;
    }

    if (record?.isActioned == 1 && this.currentUserIsLastUpdatedByUser()) {
      this.saveButton = false;
      this.withdrawRequestButton = true;
    }

    if (record?.recId > 0 && record?.isActioned == 0) {
      this.removeButton = true;
    }

    // if (this.saveButton == false) {
    //   this.title = 'Submitted';
    // }
  }

  disableSaveSubmitButtons() {
    return !this.record.pid ? true : false;
  }

  showSelectUserAlert() {
    return this.record?.pid > 0 ? false : true;
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
    // return this.record?.recId == 0 || this.currentUser.id === this.record?.updatedById ? true : false;
  }
  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.requestsService.DeactivateRequestUserAddorUpdate(this.record).subscribe(
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

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  submitForApproval() {
    if (this.form.valid) {
      this.loading = true;

      this.addUpdateSub = this.requestsService.DeactivateRequestUserAddorUpdateandSend(this.record).subscribe(
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

      this.addUpdateSub = this.requestsService.DeactivateRequestUserWidthdraw(this.record).subscribe(
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

  SearchUserInfo() {
    //console.warn('Your order has been submitted', this.form1.value.UserId);
    if (this.form1.valid) {
      this.loading = true;
      this.form.reset();

      this.loadNewRecordSub = this.requestsService.DeactivateRequestGetUserData(this.form1.value.UserId).subscribe(
        (res: any) => {
          if (res.status === 400) {
            this.loading = false;
            return;
          } else {
            this.record = res;
            this.record.createdById = this.credSerivce.currentUser.id;
            this.record.updatedById = this.credSerivce.currentUser.id;
            this.record.requestedBy = this.credSerivce.currentUser.fullName;
            this.record.Pid = res.recId;
            this.record.recId = 0;
            this.submitForApprovalButton = true;
            this.saveButton = true;
            this.loading = false;
            this.DisplayCreateForm = true;
          }
          // this.isLoading = false;
        },
        err => {
          this.loading = false;
          this.DisplayCreateForm = false;
          console.log(`error while editing = ${err}`);
        }
      );
    }
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
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
