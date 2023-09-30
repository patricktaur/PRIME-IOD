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
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-approval-request-edit',
  templateUrl: './approval-request-edit.component.html',
  styleUrls: ['./approval-request-edit.component.css']
})
export class ApprovalRequestEditComponent implements OnInit {
  loading: boolean = false;
  title = '';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  parId: number | any;
  childItemId: number | any;
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
    private requestsService: RequestsCodeListService,
    private credSerivce: CredentialsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.recId = params.id;
      this.loadRecord(this.recId);
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    // this.loadRecordSub = this.requestsService.ApprovalRequestCodelistEdit(recId).subscribe(
    this.loadRecordSub = this.requestsService.RecordForEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.setButtonVisibility(this.record);
          this.setIds(this.record);
          let types = ['', 'Add', 'Update', 'Deactivate'];
          let type = types[this.record.requestType];
          this.title = `Approve Request to ${type} Code List Item`;
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
    if (this.record.isActioned == 2 || this.record.isActioned == 3) {
      this.ApprovedOrRejectedButton = false;
    }
    if (this.record.isActioned == 3) {
      this.undoRejectButton = true;
    }
  }

  setIds(record: any) {
    switch (record.requestType) {
      case 1: //new
        this.parId = record.pid;
        this.childItemId = null;
        break;
      case 2: //update
      case 3: //deactivate
        this.parId = null;
        this.childItemId = record.pid;
        break;
      default:
        break;
    }
  }
  approve() {
    this.loading = true;
    this.record.approvedById = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.approve(this.record).subscribe(
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
    this.record.approvedById = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.reject(this.record).subscribe(
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
    // this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.undoReject(this.record).subscribe(
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

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'orderNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Order Number',
        // required: true,
        helpText: 'Enter a Order Number',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'description',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Description',
        required: true,
        helpText: 'Enter a Description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      },
      validation: {
        show: true
      }
    }, //--
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
          className: 'col-3',
          key: 'requestedById',
          type: 'label',
          templateOptions: {
            label: 'Requested By'
          }
        }
      ]
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
          className: 'col-3',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Actioned by'
          }
        }
      ],
      hideExpression: 'model?.isActioned != 3'
    },
    {
      template: '<hr>'
    }
  ];
}
