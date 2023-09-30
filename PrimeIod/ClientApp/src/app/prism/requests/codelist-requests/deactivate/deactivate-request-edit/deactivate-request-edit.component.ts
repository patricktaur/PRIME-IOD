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

// import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';
import { RequestsCodeListService } from '@app/prism/requests/codelist-requests/requests-codelist.service';

import { UserEdit } from '@app/core/models/user-edit.model';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-deactivate-request-edit',
  templateUrl: './deactivate-request-edit.component.html',
  styleUrls: ['./deactivate-request-edit.component.css']
})
export class DeactivateRequestEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Request to remove a Code List Item';

  // controllerName = 'TblRequestStudy';
  records: any;
  currentUser: any;
  // paramdata: any;
  form = new FormGroup({});
  // form1 = new FormGroup({});
  recId: number = 0;
  record: any;
  pid: number = 0;
  paramDropDownDisabled: boolean = false;
  canSelectChildItem: boolean = false;

  // record1: any;
  // ExistingRecords: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;

  // OperatingDivisionParId = 2900;
  // OfficeRegionParId = 3000;
  // OfficeCountryParId = 3100;
  // RoleParId = 1800; //yet to plan
  // yesNoItems: any = null;

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
    private requestsService: RequestsCodeListService,
    private credSerivce: CredentialsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credSerivce.currentUser;
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        this.title = this.title + ' - create';
        this.loadNewRecord();
        //let studyId = params.studyId;
        // this.DisplaySearchForm = true;
      } else {
        this.title = this.title + ' - modify';
        // this.DisplaySearchForm = false;
        // this.DisplayCreateForm = true;
        // this.DisplayDataTable = false;
        this.recId = params.id;
        this.loadRecord(this.recId);
      }
    });
  }

  // onRaiseEvent(value: any) {
  //   let actionCommand = value?.actionCommand;
  //   let id = value?.actionValue;
  //   switch (actionCommand) {
  //     case 'edit':
  //       // this.edit(id);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  onParamParentChange(value: any) {
    this.record.pid = value;
  }

  onChildItemChange(value: any) {
    if (value) {
      this.record.pid = value.recId;
      this.record.orderNumber = value.orderNumber;
      this.record.description = value.description;
    } else {
      this.record.pid = 0;
      this.record.orderNumber = 0;
      this.record.description = '';
    }
  }

  loadNewRecord() {
    this.loading = true;
    this.loadNewRecordSub = this.requestsService.DeactivateRequestCodelistNew().subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.setButtonVisibility(this.record);

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

    this.loadRecordSub = this.requestsService.RecordForEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.pid = res.pid;
          this.setButtonVisibility(this.record);

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.requestsService.delete(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.location.back();
          // this.removeRecord(recId);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  setButtonVisibility(record: any) {
    if (!record?.isActioned) {
      record.isActioned = 0;
    }

    if (record.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
      this.saveButton = true;
      this.submitForApprovalButton = true;

      this.canSelectChildItem = true;
    }
    if (record.isActioned == 1 && this.currentUserIsLastUpdatedByUser()) {
      this.withdrawRequestButton = true;
    }
    this.removeButton = false;
    if (record?.recId > 0 && record.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
      this.removeButton = true;
    }
    if (record.isActioned != 0 && this.currentUserIsLastUpdatedByUser()) {
      this.paramDropDownDisabled = true;
      this.canSelectChildItem = false;
    }
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

    this.record.createdById = this.credSerivce.currentUser.id;
    this.record.updatedById = this.credSerivce.currentUser.id;
    this.record.requestedById = this.credSerivce.currentUser.fullName;
    //this.record.Pid =  this.form1.value.CodelistId;

    this.addUpdateSub = this.requestsService.addorUpdate(this.record).subscribe(
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
    this.addOrUpdate();
    // if (this.form.valid) {

    //   this.addOrUpdate();
    // }
  }

  get savelButtonEnabled() {
    return this.record?.pid > 0 ? true : false;
  }

  get submitForApprovalButtonEnabled() {
    return this.record?.pid > 0 ? true : false;
  }

  submitForApproval() {
    if (this.form.valid) {
      this.loading = true;
      this.record.createdById = this.credSerivce.currentUser.id;
      this.record.updatedById = this.credSerivce.currentUser.id;
      this.record.requestedBy = this.credSerivce.currentUser.fullName;
      //this.record.Pid =  this.form1.value.CodelistId;

      this.addUpdateSub = this.requestsService.submitForApproval(this.record).subscribe(
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

      this.addUpdateSub = this.requestsService.widthdraw(this.record).subscribe(
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

  back() {
    this.location.back();
  }

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
      header: 'Order Number',
      field: 'orderNumber',
      align: 'Center'
    },
    {
      header: 'Description',
      field: 'description'
    }
  ];

  options: FormlyFormOptions | any= {};
  fields: FormlyFieldConfig[] = [
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
          key: 'requestTypeText',
          type: 'label',
          templateOptions: {
            label: '  Request Type'
          }
        },
        {
          className: 'col-6',
          key: 'isActionedText',
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
          key: 'requestedById',
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
          key: 'approvedById',
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
