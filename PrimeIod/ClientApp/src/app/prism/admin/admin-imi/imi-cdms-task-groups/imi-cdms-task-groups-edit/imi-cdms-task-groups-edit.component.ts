import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { imicdmstaskgroupsService } from '@app/prism/admin/admin-imi/imi-cdms-task-groups/imi-cdms-task-groups.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-imi-cdms-task-groups-edit',
  templateUrl: './imi-cdms-task-groups-edit.component.html',
  styleUrls: ['./imi-cdms-task-groups-edit.component.css']
})
export class ImiCdmsTaskGroupsEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Edit IMI CDMS Task Groups';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  TaskGroupName: string = '';
  Taskrecords: any;
  currentUser: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;
  userForm: FormGroup = new FormGroup({});

  //OperatingDivisionParId = 2900;
  // OfficeRegionParId = 3000;
  //OfficeCountryParId = 3100;
  //RoleParId = 1800; //yet to plan
  YesNoPid = 600;
  CDMSParId = 11372;

  yesNoItems: any = null;

  roles: any = [];
  applicationRoles: any = [];

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,

    // private tblParamService: TblParamService,
    private imicdmstaskgroupsService: imicdmstaskgroupsService,
    private credSerivce: CredentialsService,
        private tblParamService: TblParamService,
    
  ) {}

  ngOnInit(): void {
    // this.loadApplicationRoles();
    this.buildForm();
    this.currentUser = this.credSerivce.currentUser;
    this.route.queryParams.subscribe((params: any) => {
      this.recId = params.id;
      if (this.recId > 0) {
        this.loadRecord(this.recId);
      } else {
        this.loadNewRecord();
      }
    });
  }

  // loadApplicationRoles() {
  //   this.appAdminService.getAllRoles().subscribe((roles: any) => {
  //     // this.applicationRoles = roles;
  //   });
  // }

  // get availableRoles() {
  //   if (this.applicationRoles == null) {
  //     return null;
  //   }
  //   if (this.roles == null) {
  //     return this.applicationRoles;
  //   }
  //   return this.applicationRoles.filter(function(item: any) {
  //     return this.indexOf(item.name) < 0;
  //   }, this.roles);
  // }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.imicdmstaskgroupsService.GetById(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.TaskGroupName = res.taskGroupTitle;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );

    // this.appAdminService.getUser(recId.toString()).subscribe((user: any) => {
    //   this.roles = user.roles;
    // });
    // this.userForm.patchValue({
    //   id: this.record.recId ? this.record.recId : null,
    //   fullName: this.record.displayName,
    //   enterpriseId: this.record.enterpriseId,
    //   email: this.record.emailId

    // });
  }

  loadNewRecord() {
    this.loading = true;
    this.loadRecordSub = this.imicdmstaskgroupsService.NewCDMSTasksRequest().subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  // columns: Array<any> = [
  //   {
  //     header: 'Actions',
  //     field: 'recId',
  //     actionType: 'raise-event',
  //     linkText: 'Open',
  //     actionCommand: 'edit',
  //     actionField: 'recId',
  //     actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
  //   },
  //   // {
  //   //   header: 'RecID',
  //   //   field: 'recId'
  //   // },
  //   {
  //     header: 'Order Number',
  //     field: 'orderNo'
  //   },

  //   {
  //     header: 'Name',
  //     field: 'taskName'
  //   }
  // ];
  // addRole(role: string) {
  //   this.roles.push(role);
  // }

  // removeRole(i: number) {
  //   this.roles.splice(i, 1);
  // }

  buildForm() {
    // this.userForm = this.userForm = this.formBuilder.group({
    //   id: new FormControl(null),
    //   orderNo: new FormControl('', [Validators.required]),
    //   taskName: new FormControl('', [Validators.required])
    //   // email: new FormControl('', [Validators.required]),
    //   // name: new FormControl(''),
    //   // CanLogin: new FormControl(''),
    //   // Active: new FormControl(''),
    //   // Joiningdate: new FormControl('', [Validators.required]),
    //   // Leavingdate: new FormControl(''),
    //   // RolePid: new FormControl('', [Validators.required]),
    //   // OperatingDivisionPid: new FormControl('', [Validators.required]),
    //   // OfficeRegionPid: new FormControl('', [Validators.required]),
    //   // OfficeCountryPid: new FormControl('', [Validators.required]),
    //   // //Month:new FormControl('', [Validators.required]),
    //   // TimeZoneId: new FormControl('', [Validators.required])
    // });
    // if (true) {
    //   this.userForm.patchValue({
    //     isEmployee: true
    //   });
    // }
  }

  addOrUpdate() {
    this.loading = true;
    console.log(this.record);
    // this.userForm.patchValue({
    //   id: this.record.recId,
    //   orderNo: this.record.orderNo,
    //   taskName: this.record.taskName
    //   // email: this.record.emailId,
    //   // CanLogin: this.record.canLogin,
    //   // Active: this.record.active,
    //   // Joiningdate: this.record.joiningdate,
    //   // Leavingdate: this.record.leavingdate,
    //   // RolePid: this.record.rolePid,
    //   // OperatingDivisionPid: this.record.operatingDivisionPid,
    //   // OfficeRegionPid: this.record.officeRegionPid,
    //   // OfficeCountryPid: this.record.officeCountryPid,
    //   // //Month:this.record.month,
    //   // TimeZoneId: this.record.timeZoneId
    // });
    // const existingUser = Object.assign({}, this.record, this.userForm.value);
    // existingUser.roles = this.roles;

    this.addUpdateSub = this.imicdmstaskgroupsService.AddorUpdate(this.record).subscribe(
      res => {
        // this.form.reset();
        // this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );

    for (var i = 0; i < this.record.taskList.length; i++) {
      console.log('--------------------------------');
      console.log(this.record.taskList[i]);

      const pt = new TaskGroupClass();
      pt.RecId = this.record.taskList[i].recId;
      pt.GroupId = this.record.recId;
      pt.TaskId = this.record.taskList[i].taskId;
      pt.IsInclude = this.record.taskList[i].includeflag;
      pt.OrderNo = this.record.taskList[i].orderNumber;

      console.log(pt);

      this.addUpdateSub = this.imicdmstaskgroupsService.AddorUpdateCDMSTaskGroup(pt).subscribe(
        res => {
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(`error while editing = ${err}`);
        }
      );
    }

    // this.form.reset();
    this.location.back();
  }

  // canDeactivate(): Observable<boolean> | boolean {
  //   if (this.form.dirty) {
  //     let message = "There are unsaved changes in Study Request.  Click 'Ok' to continue without saving. ";
  //     const confirmation = window.confirm(message);
  //     if (confirmation === true) {
  //       this.form.reset(); //for reactivating ICON Study No dropdown.
  //     }
  //     return of(confirmation);
  //   } else {
  //     return of(true);
  //   }
  // }

  canSave() {
    // if (this.form.dirty && this.record.displayName) {
    //   return true;
    // }
    if (this.form.dirty) {
      return true;
    }
    return false;
  }

  submit() {
    if (this.canSave()) {
      this.addOrUpdate();
    }
  }

  deleteRecord(recId: number) {
    this.loading = true;
    this.deleteRecordSub = this.imicdmstaskgroupsService.deleteRec(recId).subscribe(
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
      key: 'taskGroupTitle',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Group Name',
        required: true,
        helpText: 'Enter a Group Name',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'ocId',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS',
        //required: true,

        options: this.tblParamService.getParams(this.CDMSParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'isSetUp',
      type: 'checkbox',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Is Setup',
        //required: true,
        // helpText: 'click',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'isShared',
      type: 'checkbox',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Is Shared',
        //required: true,
        //helpText: 'click',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'updatedOn',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Last Saved On',
        //required: true,
        disabled: true,
        //helpText: 'click',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      fieldGroupClassName: 'row bg-green',
      fieldGroup: [
        {
          className: 'col-4',
          template: '<label >Task</label>'
        },
        {
          className: 'col-4',
          template: '<label >Order Number</label>'
        },
        {
          className: 'col-4',
          template: '<label >Include</label>'
        }
      ]
    },

    {
      key: 'taskList',
      type: 'repeat',
      templateOptions: {
        hideRemoveButton: true,
        hideAddButton: true
      },
      fieldArray: {
        fieldGroupClassName: 'row alt-row-form',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'label',
            key: 'taskName'
          },
          {
            type: 'input',
            key: 'orderNumber',
            className: 'col-4',
            wrappers: ['help-text'],
            templateOptions: {
              helpText: 'Enter the order Number',
              type: 'number'
            }
          },
          {
            type: 'checkbox',
            key: 'includeflag',
            className: 'col-4',
            wrappers: ['help-text'],
            templateOptions: {
              helpText: 'Click to include'
            }
          }
        ]
      }
    }

    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Database Build</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'tasks.databaseBuildOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         type:'number',
    //         helpText:'',
    //         helpTextPlacement: 'left',

    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'tasks.databaseBuildIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Database Testing</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'databaseTestingOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'databaseTestingIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >DVS Review</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'dvsReviewOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'dvsReviewIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Test Script/Data Writing</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'testScriptOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'testScriptIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Edit Check Programming</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'editCheckProgrammingOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'editCheckProgrammingIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Round 1 Edit Check Programming</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'round1OrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'round1Includeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Round 2 Edit Check Programming</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'round2OrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'round2Includeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Edit Check Validation</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'editCheckValidationOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'editCheckValidationIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Internal UAT</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'internalUATOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'internalUATIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >External UAT</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'externalUATOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'externalUATIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Migration Configuration</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'migrationConfigOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'migrationConfigIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Migration Testing</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'migrationTestingOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'migrationTestingIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //   ]
    // },
    // {
    //   fieldGroupClassName: 'row bg-light align-items-center',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Go-Live</label>'
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'goLiveOrderNumber',
    //       type: 'input',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText:
    //           '',
    //         helpTextPlacement: 'left',
    //        // required: true
    //       }
    //     },
    //     {
    //       className: 'col-4',
    //       key: 'goLiveIncludeflag',
    //       type: 'checkbox',
    //       wrappers: ['help-text'],
    //       templateOptions: {
    //         helpText: '',
    //         helpTextPlacement: 'left'
    //       }
    //     }
    //     ]
    //   },
  ];
}
class TaskGroupClass {
  RecId: number | undefined;
  CreatedById: number | undefined;
  CreatedOn: string | undefined;
  UpdatedById: number | undefined;
  UpdatedOn: string | undefined;
  DeletedById: number | undefined;
  DeletedOn: string | undefined;
  TaskId: number | undefined;
  GroupId: number | undefined;
  IsInclude: boolean | undefined;
  OrderNo: number | undefined;
}
