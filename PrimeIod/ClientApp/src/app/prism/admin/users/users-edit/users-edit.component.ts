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
import { UsersService } from '@app/prism/admin/users/users.service';

import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from '@app/shared/services/toast.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  [x: string]: any;
  loading: boolean = false;
  title = 'Edit User';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;
  userForm: FormGroup = new FormGroup({});

  OperatingDivisionParId = 2900;
  OfficeRegionParId = 3000;
  OfficeCountryParId = 3100;
  RoleParId = 1800; //yet to plan
  YesNoPid = 600;

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
    private tblParamService: TblParamService,
    private usersService: UsersService,
    private requestsService: RequestsUserService,
    private credSerivce: CredentialsService,
    private formBuilder: FormBuilder,
    private appAdminService: AppAdminService
  ) {}

  ngOnInit(): void {
    this.loadApplicationRoles();
    this.buildForm();
    this.currentUser = this.credSerivce.currentUser;
    this.route.queryParams.subscribe((params: any) => {
      this.recId = params.id;
      this.loadRecord(this.recId);
    });
  }

  loadApplicationRoles() {
    // this.appAdminService.getAllRoles().subscribe((roles: any) => {
    //   this.applicationRoles = roles;
    //   this.applicationRoles.sort((a: any, b: any) => a.name.localeCompare(b.name));
    // });


    this.tblParamService.getRoles().subscribe((roles: any) => {
      this.applicationRoles = roles;
      // this.applicationRoles.sort((a: any, b: any) => a.name.localeCompare(b.name));
    });
  }

  get availableRoles() {
    if (this.applicationRoles == null) {
      return null;
    }
    if (this.roles == null) {
      return this.applicationRoles;
    }
    // return this.applicationRoles.filter((item: any) => {
    //   return this['indexOf'](item.name) < 0;
    // }, this.roles);

    var availableRoles = this.applicationRoles.filter((item: any) => {
      return this.roles.findIndex((x: any) => x == item.name) < 0;
    });

    return availableRoles;
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.usersService.GetUser(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.roles = this.record.roles;
          this.roles.sort((a: any, b: any) => a.localeCompare(b));
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
    //   this.roles.sort((a: any, b: any) => a.localeCompare(b));
    // });
  }

  addRole(role: string) {
    this.roles.push(role);
    this.roles.sort((a: any, b: any) => a.localeCompare(b));
    if(!this.form.dirty) {
      this.form.markAsDirty();
    }
  }

  removeRole(i: number) {
    this.roles.splice(i, 1);
    if(!this.form.dirty) {
      this.form.markAsDirty();
    }
  }

  buildForm() {
    this.userForm = this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      fullName: new FormControl('', [Validators.required]),
      enterpriseId: new FormControl('', [Validators.required]),
      employeeId:new FormControl(''),
      email: new FormControl('', [Validators.required]),
      name: new FormControl(''),
      CanLogin: new FormControl(''),
      Active: new FormControl(''),
      Joiningdate: new FormControl('', [Validators.required]),
      Leavingdate: new FormControl(''),
      RolePid: new FormControl('', [Validators.required]),
      OperatingDivisionPid: new FormControl('', [Validators.required]),
      OfficeRegionPid: new FormControl('', [Validators.required]),
      OfficeCountryPid: new FormControl('', [Validators.required]),
      //Month:new FormControl('', [Validators.required]),
      TimeZoneId: new FormControl('', [Validators.required])
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
    this.userForm.patchValue({
      id: this.record.recId,
      fullName: this.record.displayName,
      enterpriseId: this.record.enterpriseId,
      employeeId:this.record.employeeId,
      email: this.record.emailId,
      CanLogin: this.record.canLogin,
      Active: this.record.active,
      Joiningdate: this.record.joiningdate,
      Leavingdate: this.record.leavingdate,
      RolePid: this.record.rolePid,
      OperatingDivisionPid: this.record.operatingDivisionPid,
      OfficeRegionPid: this.record.officeRegionPid,
      OfficeCountryPid: this.record.officeCountryPid,
      //Month:this.record.month,
      TimeZoneId: this.record.timeZoneId
    });
    const existingUser = Object.assign({}, this.record, this.userForm.value);
    existingUser.roles = this.roles;

    this.addUpdateSub = this.usersService.CreateRequestUserAddorUpdate(existingUser).subscribe(
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
    // console.log(`form dirty = ${this.form.dirty}`);
    // if (this.form.dirty) {
    //   return true;
    // }
    // return false;
    return true;
  }

  submit() {
    if (this.canSave()) {
      this.addOrUpdate();
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'canLogin',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Can Login',
        //  required: true,

        options: this.requestsService.yesNo,
        valueProp: 'value',
        labelProp: 'label',
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },

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
        //required: true,
        helpText: 'Enter a Employee ID',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        maxLength:8
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'active',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Active',
        //required: true,

        options: this.requestsService.yesNo,
        valueProp: 'value',
        labelProp: 'label',
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'leavingdate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Leaving Date',
        // required: true,
        helpText: 'Enter a User Leaving Date',
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
    //Not used in PrismV2:
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },

    // {
    //   key: 'month',
    //   type: 'date-picker',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Start Date in Clinical Industory',
    //     required: true,
    //     helpText: 'Enter a Start Date in Clinical Industory',
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
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    }
  ];
}
