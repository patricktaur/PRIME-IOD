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
  selector: 'app-update-approval-request',
  templateUrl: './approval-update-request.component.html',
  styleUrls: ['./approval-update-request.component.css']
})
export class ApprovalRequestUpdateComponent implements OnInit {
  loading: boolean = false;
  title = 'Request Task';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  ApprovedOrRejectedButton: boolean = false;
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
        this.title = 'Create';
      } else {
        this.recId = params.id;
        this.loadRecord(this.recId);
        this.title = 'Request Task';
      }
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.requestsService.ApprovalRequestUpdateUserEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          if (this.record.requestUserDTO.isActioned == 1) {
            this.ApprovedOrRejectedButton = true;
          }
          if (this.record.requestUserDTO.isActioned == 3) {
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
    this.addUpdateSub = this.requestsService.ApprovalRequestUserApprove(this.record.requestUserDTO).subscribe(
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
    this.addUpdateSub = this.requestsService.ApprovalRequestUserReject(this.record.requestUserDTO).subscribe(
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
    this.addUpdateSub = this.requestsService.ApprovalRequestUserUndoReject(this.record.requestUserDTO).subscribe(
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
    if (this.record?.requestUserDTO?.rejectedComments) {
      return true;
    } else {
      return false;
    }
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          template: '<label >Field</label>'
        },
        {
          className: 'col-4',
          template: '<label >Current Value</label>'
        },
        {
          className: 'col-4',
          template: '<label >Update to</label>'
        }
      ]
    },

    {
      fieldGroupClassName: 'row',

      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Name</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.displayName',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.displayName',
          type: 'input',
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >EMail Id</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.emailId',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.emailId',
          type: 'input',
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Employee Id</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.employeeId',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.employeeId',
          type: 'input',
          templateOptions: {
           // required: true
           maxLength:8
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Enterprise Id</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.enterpriseId',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.enterpriseId',
          type: 'input',
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Joining Date</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.joiningdate',
          type: 'label',
          templateOptions: {
            hideLabel: true,
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.joiningdate',
          type: 'date-picker',
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Role</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.rolePDescription',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.rolePid',
          type: 'ng-select',

          templateOptions: {
            required: true,
            options: this.tblParamService.getParams(this.RoleParId),
            valueProp: 'recId',
            labelProp: 'description'
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Operating Division</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.operatingDivisionPDescription',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.operatingDivisionPid',
          type: 'ng-select',
          templateOptions: {
            required: true,
            options: this.tblParamService.getParams(this.OperatingDivisionParId),
            valueProp: 'recId',
            labelProp: 'description'
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Office Region</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.officeRegionPDescription',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.officeRegionPid',
          type: 'ng-select',
          templateOptions: {
            required: true,
            options: this.tblParamService.getParams(this.OfficeRegionParId),
            valueProp: 'recId',
            labelProp: 'description'
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Office Country</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.officeCountryPDescription',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.officeCountryPid',
          type: 'ng-select',
          templateOptions: {
            required: true,
            options: this.tblParamService.getParams(this.OfficeCountryParId),
            valueProp: 'recId',
            labelProp: 'description'
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Time Zone</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.timeZoneId',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.timeZoneId',
          type: 'select',
          templateOptions: {
            required: true,
            options: this.requestsService.timeZone,
            valueProp: 'value',
            labelProp: 'label'
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Start Date in Clinical Industry</label>'
        },
        {
          className: 'col-4',
          key: 'userViewDTO.month',
          type: 'label',
          templateOptions: {
            hideLabel: true,
            pipe: 'date',
            pipeFormat: 'MMM-yyyy'
          }
        },
        {
          className: 'col-4',

          key: 'requestUserDTO.month',
          type: 'date-picker',
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      template: '<hr>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Requestor Comments</label>'
        },

        {
          className: 'col-8',

          key: 'requestUserDTO.requesterComments',
          type: 'textarea',
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Approve Comments</label>'
        },

        {
          className: 'col-8',

          key: 'requestUserDTO.approverComments',
          type: 'textarea',
          templateOptions: {
            // required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Reject Comments</label>'
        },

        {
          className: 'col-8',

          key: 'requestUserDTO.rejectedComments',
          type: 'textarea',
          templateOptions: {
            // required: true
          }
        }
      ]
    },

    {
      template: '<hr>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'requestUserDTO.recId',
          type: 'label',

          templateOptions: {
            label: '  Request Id'
          }
        },
        {
          className: 'col-3',
          key: 'requestUserDTO.requestType',
          type: 'label',
          templateOptions: {
            label: '  Request Type'
          }
        },
        {
          className: 'col-6',
          key: 'requestUserDTO.requestStatus',
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
          key: 'requestUserDTO.requestedOn',
          type: 'label',
          templateOptions: {
            label: 'Request On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          className: 'col-9',
          key: 'requestUserDTO.requestedBy',
          type: 'label',
          templateOptions: {
            label: 'Requested By'
          }
        }
      ],
      hideExpression: 'model?.requestUserDTO?.isActioned == 0'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'requestUserDTO.approvedOn',
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
          key: 'requestUserDTO.approvedBy',
          type: 'label',
          className: 'col-9',

          templateOptions: {
            label: 'Actioned by'
          }
        }
      ],
      hideExpression: 'model?.requestUserDTO?.isActioned < 2'
    },
    {
      template: '<hr>'
    }
  ];
}
