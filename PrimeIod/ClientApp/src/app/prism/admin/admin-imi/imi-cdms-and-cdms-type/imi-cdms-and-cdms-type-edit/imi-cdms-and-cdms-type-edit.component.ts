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
//import { cdmstaskgroupsService } from '@app/prism/admin/cdms/cdms-task-groups/cdms-task-groups.service';
//import { cdmstasksService } from '@app/prism/admin/cdms/cdms-tasks/cdms-tasks.service';
import { imicdmsandcdmstypeService } from '@app/prism/admin/admin-imi/imi-cdms-and-cdms-type/imi-cdms-and-cdms-type.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-imi-cdms-and-cdms-type-edit',
  templateUrl: './imi-cdms-and-cdms-type-edit.component.html',
  styleUrls: ['./imi-cdms-and-cdms-type-edit.component.css']
})
export class ImiCdmsAndCdmsTypeEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Edit IMI CDMS and CDMS Type';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  cdmsname:string = '';
  record: any;
  Taskrecords: any;
  currentUser: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;
  userForm: FormGroup = new FormGroup({});

  //   OperatingDivisionParId = 2900;
  //   OfficeRegionParId = 3000;
  //   OfficeCountryParId = 3100;
  //   RoleParId = 1800; //yet to plan
  //   YesNoPid = 600;
  CDMSParId = 5400;

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
    // private cdmstaskgroupsService: cdmstaskgroupsService,
    private imicdmsandcdmstypeService: imicdmsandcdmstypeService,
    private credSerivce: CredentialsService,
    private formBuilder: FormBuilder,

    private tblParamService: TblParamService // private cdmstasksService: cdmstasksService
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
      //   this.loadCDMSTasksReport();
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
    this.loadRecordSub = this.imicdmsandcdmstypeService.GetById(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.cdmsname = res.cdmsName;
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
    this.loadRecordSub = this.imicdmsandcdmstypeService.NewCDMSTasksRequest().subscribe(
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

  //   loadCDMSTasksReport() {
  //     this.loading = true;
  //     this.cdmstasksService.GetList().subscribe(
  //       (res: any) => {
  //         if (res.status === 400) {
  //           return;
  //         } else {
  //           this.Taskrecords = res;
  //         }
  //         this.loading = false;
  //       },
  //       (err: any) => {
  //         console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //         this.loading = false;
  //       }
  //     );
  //   }
  //   columns: Array<any> = [
  //     {
  //       header: 'Actions',
  //       field: 'recId',
  //       actionType: 'raise-event',
  //       linkText: 'Open',
  //       actionCommand: 'edit',
  //       actionField: 'recId',
  //       actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
  //     },
  //     // {
  //     //   header: 'RecID',
  //     //   field: 'recId'
  //     // },
  //     {
  //       header: 'Order Number',
  //       field: 'orderNo'
  //     },

  //     {
  //       header: 'Name',
  //       field: 'taskName'
  //     }
  //   ];
  // addRole(role: string) {
  //   this.roles.push(role);
  // }

  // removeRole(i: number) {
  //   this.roles.splice(i, 1);
  // }

  buildForm() {
    this.userForm = this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      orderNo: new FormControl('', [Validators.required]),
      cdmsName: new FormControl('', [Validators.required]),
      cdmstypeId: new FormControl('', [Validators.required]),
      emailIdList: new FormControl('', [Validators.required])
      // email: new FormControl('', [Validators.required]),
      // name: new FormControl(''),
      // CanLogin: new FormControl(''),
      // Active: new FormControl(''),
      // Joiningdate: new FormControl('', [Validators.required]),
      // Leavingdate: new FormControl(''),
      // RolePid: new FormControl('', [Validators.required]),
      // OperatingDivisionPid: new FormControl('', [Validators.required]),
      // OfficeRegionPid: new FormControl('', [Validators.required]),
      // OfficeCountryPid: new FormControl('', [Validators.required]),
      // //Month:new FormControl('', [Validators.required]),
      // TimeZoneId: new FormControl('', [Validators.required])
    });

    if (true) {
      this.userForm.patchValue({
        isEmployee: true
      });
    }
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

    this.addUpdateSub = this.imicdmsandcdmstypeService.AddorUpdate(this.record).subscribe(
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
    this.deleteRecordSub = this.imicdmsandcdmstypeService.deleteRec(recId).subscribe(
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
      key: 'cdmsName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS',
        required: true,
        helpText: 'Enter a CDMS',
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
      key: 'cdmstypeId',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Type',
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
      key: 'orderNo',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Order Number',
        required: true,
        helpText: 'Enter a Order Number',
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
      key: 'emailIdList',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Email IDs List',
        required: true,
        helpText: 'Enter a Email IDs List',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    }
    // {
    //   key: 'emailId',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Email ID',
    //     required: true,
    //     helpText: 'Enter a User Email ID',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },

    //   validators: {
    //     validation: ['emailValidation']
    //   }
    // },
    // {
    //   key: 'enterpriseId',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Enterprise ID',
    //     required: true,
    //     helpText: 'Enter a Enterprise ID',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'active',
    //   type: 'select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Active',
    //     //required: true,

    //     options: this.requestsService.yesNo,
    //     valueProp: 'value',
    //     labelProp: 'label',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   // validation: {
    //   //   show: true
    //   // }
    // },
    // {
    //   key: 'joiningdate',
    //   type: 'date-picker',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Joining Date',
    //     required: true,
    //     helpText: 'Enter a User Joining Date',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'leavingdate',
    //   type: 'date-picker',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Leaving Date',
    //     // required: true,
    //     helpText: 'Enter a User Leaving Date',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'rolePid',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Role',
    //     required: true,

    //     options: this.tblParamService.getRoles(),
    //     valueProp: 'recId',
    //     labelProp: 'description',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'operatingDivisionPid',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Operating Division',
    //     required: true,

    //     options: this.tblParamService.getParams(this.OperatingDivisionParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'officeRegionPid',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Office Region',
    //     required: true,

    //     options: this.tblParamService.getParams(this.OfficeRegionParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'officeCountryPid',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Office Country',
    //     required: true,

    //     options: this.tblParamService.getParams(this.OfficeCountryParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // },

    // {
    //   key: 'timeZoneId',
    //   type: 'select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Time Zone',
    //     required: true,
    //     options: this.requestsService.timeZone,
    //     valueProp: 'value',
    //     labelProp: 'label',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   validation: {
    //     show: true
    //   }
    // }
  ];
}
