import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
// import { clininfocdmstaskgroupsservice } from '@app/prism/admin/cdms/clininfo-cdms-task-groups/clininfo-cdms-task-groups.service';
// import { clininfocdmstasksService } from '@app/prism/admin/cdms/clininfo-cdms-tasks/clininfo-cdms-tasks.service';
import {clininfocdmstaskgroupsservice} from '@app/prism/admin/admin-clin-info/clininfo-cdms-task-groups/clininfo-cdms-task-groups.service';
import {clininfocdmstasksService} from '@app/prism/admin/admin-clin-info/clininfo-cdms-tasks/clininfo-cdms-tasks.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from '@app/shared/services/toast.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';

@Component({
  selector: 'app-clininfo-cdms-task-groups-edit',
  templateUrl: './clininfo-cdms-task-groups-edit.component.html',
  styleUrls: ['./clininfo-cdms-task-groups-edit.component.css']
})
export class ClininfoCdmsTaskGroupsEditComponent {
  loading: boolean = false;
  title = 'Edit CDMS Task Groups';
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

    private clininfocdmstaskgroupsservice: clininfocdmstaskgroupsservice,
    private credSerivce: CredentialsService,
    private formBuilder: FormBuilder,
    private appAdminService: AppAdminService,
    private tblParamService: TblParamService,
    private clininfocdmstasksService: clininfocdmstasksService
  ) {}

  ngOnInit(): void {
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


  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.clininfocdmstaskgroupsservice.GetById(recId).subscribe(
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

  }


  loadNewRecord() {
    this.loading = true;
    this.loadRecordSub = this.clininfocdmstaskgroupsservice.NewCDMSTasksRequest().subscribe(
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

  

  buildForm() {
 
  }

  addOrUpdate() {
    this.loading = true;
    console.log(this.record);
    this.addUpdateSub = this.clininfocdmstaskgroupsservice.AddorUpdate(this.record).subscribe(
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

      this.addUpdateSub = this.clininfocdmstaskgroupsservice.AddorUpdateCDMSTaskGroup(pt).subscribe(
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
    this.deleteRecordSub = this.clininfocdmstaskgroupsservice.deleteRec(recId).subscribe(
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