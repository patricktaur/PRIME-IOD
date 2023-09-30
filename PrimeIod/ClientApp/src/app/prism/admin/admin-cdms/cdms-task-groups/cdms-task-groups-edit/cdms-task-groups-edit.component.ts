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
import { cdmstaskgroupsService } from '@app/prism/admin/admin-cdms/cdms-task-groups/cdms-task-groups.service';
import { cdmstasksService } from '@app/prism/admin/admin-cdms/cdms-tasks/cdms-tasks.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from '@app/shared/services/toast.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';

@Component({
  selector: 'app-cdms-task-groups-edit',
  templateUrl: './cdms-task-groups-edit.component.html',
  styleUrls: ['./cdms-task-groups-edit.component.css']
})
export class CdmsTaskGroupsEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Edit CDMS Task Groups';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  TaskGroupname: string = '';
  record: any;
  currentUser: any;

  YesNoPid = 600;
  CDMSParId = 1300;

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
    private cdmstaskgroupsService: cdmstaskgroupsService,
    private credSerivce: CredentialsService,
    private formBuilder: FormBuilder,
    private appAdminService: AppAdminService,
    private tblParamService: TblParamService,
    private cdmstasksService: cdmstasksService
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
      // this.loadCDMSTasksReport();
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
    this.loadRecordSub = this.cdmstaskgroupsService.GetById(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.TaskGroupname = res.taskGroupTitle;
          // this.loadTaskIncluded(this.recId);
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

  // loadTaskIncluded(GroupId: number) {
  //   this.loading = true;

  //   this.loadRecordSub = this.cdmstaskgroupsService.GetTaskByGroupId(GroupId).subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         this.loading = false;
  //         return;
  //       } else {
  //         this.Taskrecords = res;
  //         for(var i = 0; i < this.Taskrecords.length; i++)
  //         {
  //           console.log("=====================================");
  //           console.log(this.Taskrecords[i].taskId);
  //           console.log(this.Taskrecords[i].orderNo);
  //           console.log(this.Taskrecords[i].isInclude);
  //           switch ( this.Taskrecords[i].taskId) {
  //             case 2:
  //             //  this.databaseBuildOrderNumber=this.Taskrecords[i].orderNo;
  //             //  this.databaseBuildIncludeflag=this.Taskrecords[i].isInclude;

  //             // this.record={
  //             //   databaseBuildOrderNumber:this.Taskrecords[i].orderNo,
  //             //   databaseBuildIncludeflag:this.Taskrecords[i].isInclude
  //             // }
  //             //  this.record['databaseBuildRecId']=2;
  //             //  this.record['databaseBuildOrderNumber']=this.Taskrecords[i].orderNo;
  //             //  this.record['databaseBuildIncludeflag']=this.Taskrecords[i].isInclude;

  //                  //this.TaskIncludedData.databaseBuildOrderNumber=this.Taskrecords[i].orderNo;
  //                 // this.TaskIncludedData.databaseBuildIncludeflag=this.Taskrecords[i].isInclude;
  //                 break;
  //             case 111:
  //                 console.log("It is a Monday.");
  //                 break;
  //             case 12:
  //                 console.log("It is a Tuesday.");
  //                 break;
  //             case 13:
  //                 console.log("It is a Wednesday.");
  //                 break;
  //             case 14:
  //                 console.log("It is a Thursday.");
  //                 break;
  //             case 15:
  //                 console.log("It is a Friday.");
  //                 break;
  //             case 16:
  //                 console.log("It is a Saturday.");
  //                 break;
  //             // default:
  //             //     console.log("No such day exists!");
  //             //     break;
  //           }
  //         }

  //         this.loading = false;
  //       }
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       this.loading = false;
  //     }
  //   );

  //   // this.appAdminService.getUser(recId.toString()).subscribe((user: any) => {
  //   //   this.roles = user.roles;
  //   // });
  //   // this.userForm.patchValue({
  //   //   id: this.record.recId ? this.record.recId : null,
  //   //   fullName: this.record.displayName,
  //   //   enterpriseId: this.record.enterpriseId,
  //   //   email: this.record.emailId

  //   // });
  // }

  loadNewRecord() {
    this.loading = true;
    this.loadRecordSub = this.cdmstaskgroupsService.NewCDMSTasksRequest().subscribe(
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

  // loadCDMSTasksReport() {
  //   this.loading = true;
  //   this.cdmstasksService.GetList().subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         return;
  //       } else {
  //         this.Taskrecords = res;
  //       }
  //       this.loading = false;
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       this.loading = false;
  //     }
  //   );
  // }

  // addRole(role: string) {
  //   this.roles.push(role);
  // }

  // removeRole(i: number) {
  //   this.roles.splice(i, 1);
  // }

  buildForm() {
    //this.userForm = this.userForm = this.formBuilder.group({
    //   id: new FormControl(null),
    //   orderNo: new FormControl('', [Validators.required]),
    //   taskName: new FormControl('', [Validators.required]),
    //   databaseBuildOrderNumber:new FormControl('', [Validators.required]),
    // });
    // if (true) {
    //   this.record.patchValue({
    //     databaseBuildOrderNumber: 1
    //   });
    // }
    // this.record=this.formBuilder.group({
    //   databaseBuildOrderNumber:0,
    // })
    // if (true) {
    //   this.userForm.patchValue({
    //     isEmployee: true
    //   });
    // }
  }

  addOrUpdate() {
    this.loading = true;
    console.log(this.record);
    this.addUpdateSub = this.cdmstaskgroupsService.AddorUpdate(this.record).subscribe(
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

      this.addUpdateSub = this.cdmstaskgroupsService.AddorUpdateCDMSTaskGroup(pt).subscribe(
        res => {
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(`error while editing = ${err}`);
        }
      );
    }

    this.form.reset();
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
    this.deleteRecordSub = this.cdmstaskgroupsService.deleteRec(recId).subscribe(
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
