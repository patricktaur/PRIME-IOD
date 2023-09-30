import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  selector: 'app-update-request-edit',
  templateUrl: './update-request-edit.component.html',
  styleUrls: ['./update-request-edit.component.css']
})
export class UpdateRequestEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Request to update User Details';
  displayUserSelectDropDown = false;
  form = new FormGroup({});

  // form1 = new FormGroup({});
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

  OperatingDivisionParId = 2900;
  OfficeRegionParId = 3000;
  OfficeCountryParId = 3100;
  RoleParId = 1800; //yet to plan

  yesNoItems: any = null;

  users: any;

  selecteduserId: number = 0;

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
    this.displayUserSelectDropDown = true; //hide if isActioned is not 0
    this.loadUsers();

    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        //record is loaded after user is selected.
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

  onFiltersChange(value: any) {
    this.loadNewRecord(value);
  }

  loadNewRecord(id: number) {
    this.loadNewRecordSub = this.requestsService.UpdateRequestUserNew(id).subscribe((newRec: any) => {
      let currentRecId = 0;
      if (this.record?.requestUserDTO?.recId > 0) {
        //Record already saved
        currentRecId = this.record?.requestUserDTO?.recId;
      }
      this.record = newRec;
      if (currentRecId > 0) {
        this.record.requestUserDTO.recId = currentRecId;
      }
      this.setButtonVisibility(this.record);
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.requestsService.UpdateRequestUserEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.selecteduserId = this.record?.requestUserDTO?.pid;
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

  showSelectUserAlert() {
    return this.record?.requestUserDTO?.pid > 0 ? false : true;
  }

  showUserChangeAlert() {
    return this.record?.requestUserDTO?.recId > 0 ? true : false;
  }

  setButtonVisibility(record: any) {
    if (!record.requestUserDTO?.isActioned) {
      record.requestUserDTO.isActioned = 0;
    }
    if (record.requestUserDTO?.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
      this.saveButton = true;
      this.submitForApprovalButton = true;
    }
    if (record.requestUserDTO?.isActioned == 1 && this.currentUserIsLastUpdatedByUser()) {
      this.saveButton = false;
      this.withdrawRequestButton = true;
    }
    // record: { "requestUserDTO": { "recId": 0,
    this.removeButton = false;
    if (
      record.requestUserDTO?.recId > 0 &&
      record.requestUserDTO?.isActioned == 0 &&
      this.currentUserIsLastUpdatedByUser()
    ) {
      this.removeButton = true;
    }
    if (record.requestUserDTO?.isActioned != 0) {
      this.displayUserSelectDropDown = false;
    }
  }

  showOtherUserAlert() {
    return this.record?.requestUserDTO?.recId > 0 && //update
      !this.currentUserIsLastUpdatedByUser() &&
      (this.record?.requestUserDTO?.isActioned == 0 || this.record?.requestUserDTO?.isActioned == 1) //not submitted
      ? true
      : false;

    return;
  }

  currentUserIsLastUpdatedByUser() {
    return true;
    // return this.record?.requestUserDTO?.recId == 0 || this.currentUser.id === this.record?.requestUserDTO?.updatedById
    //   ? true
    //   : false;
  }

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.requestsService.UpdateRequestUserAddorUpdate(this.record).subscribe(
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

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.requestsService.UpdateRequestUserDelete(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:

          this.location.back();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
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
    if (this.form.dirty) {
      this.addOrUpdate();
    }
  }

  submitForApproval() {
    if (this.form.valid) {
      this.loading = true;

      this.addUpdateSub = this.requestsService.UpdateRequestUserAddorUpdateandSend(this.record).subscribe(
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
    this.loading = true;

    this.addUpdateSub = this.requestsService.UpdateRequestUserWidthdraw(this.record).subscribe(
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
  invalidControls: any;
  testCall() {
    this.invalidControls = this.findInvalidControls();
  }

  back() {
    this.location.back();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls : any = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
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
          template: '<label >Update to *</label>'
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
          },
          validation: {
            show: true
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
          },
          validation: {
            show: true
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
            maxLength:8
            //required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          },
          // validation: {
          //   show: true
          // }
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
          },
          validation: {
            show: true
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
          },
          validation: {
            show: true
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
            options: this.tblParamService.getRoles(),
            valueProp: 'recId',
            labelProp: 'description'
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          },
          validation: {
            show: true
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
          },
          validation: {
            show: true
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
          },
          validation: {
            show: true
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
          },
          validation: {
            show: true
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
            //required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
          }
        }
      ]
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
