import { Component, OnInit, ViewChildren, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
//import { MasterService } from '@app/masters/master.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';

import { ToastService } from '@app/shared/services/toast.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
// import * as moment from 'moment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() userId: string | any;
  @Input() employeeNumber: string | undefined;
  @Input() isUserEmployee: string | undefined;
  @Input() action: string | undefined;
  @Output() emitter = new EventEmitter();
  user: any;
  employee: any;
  roles: any = [];
  vendors: any = [];
  applicationRoles: any = [];
  userForm: FormGroup | any;
  employeeForm: FormGroup | any;

  constructor(
    private toastService: ToastService,
    // private masterService: MasterService,
    private appAdminService: AppAdminService,

    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    try {
      this.loadApplicationRoles();
      this.buildForm();
      if (this.action == 'Edit') {
        this.loadUser();
        //console.log(this.isUserEmployee);
        // if (this.isUserEmployee) this.loadEmployee();
      }
    } catch (ex) {
      console.log('trycatch:');
      console.log(ex);
    }
  }

  buildForm() {
    this.userForm = this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      fullName: new FormControl('', [Validators.required]),
      enterpriseId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    });

    // if (this.isUserEmployee) {
    //   this.userForm.patchValue({
    //     isEmployee: true
    //   });
    // }
  }

  loadApplicationRoles() {
    // alert("loadApplicationRoles");
    this.appAdminService.getAllRoles().subscribe(
      (roles: any) => {
        if (roles.status === 400) {
          return;
        } else {
          this.applicationRoles = roles;
        }
        console.log(`success roles =${roles}`);
      },
      err => {
        console.log(`err roles = ${err}`);
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  get availableRoles() {
    if (this.applicationRoles == null) {
      return null;
    }
    if (this.roles == null) {
      return this.applicationRoles;
    }
    // return this.applicationRoles.filter(function(item: any) {
    //   return this.indexOf(item.name) < 0;
    // }, this.roles);
    var availableRoles = this.applicationRoles.filter((item: any) => {
      return this.roles.findIndex((x: any) => x == item.name) < 0;
    });

    return availableRoles;
  }

  loadUser() {
    this.appAdminService.getUser(this.userId).subscribe(
      (res: any) => {
        // console.log(`success getuser=${JSON.stringify(res, null, 2)}`);
        this.user = res;
        console.log('user object');
        console.log(res.id);
        console.log(res.fullName);
        console.log(res.enterpriseId);
        console.log(res.email);
        this.userForm.patchValue({
          id: res.id
        });
        this.userForm.patchValue({
          fullName: res.fullName
        });
        this.userForm.patchValue({
          enterpriseId: res.enterpriseId
        });
        this.userForm.patchValue({
          email: res.email
        });
        this.roles = res.roles;

        console.log('user form patch values');
        console.log(this.userForm.value.id);
        console.log(this.userForm.value.fullName);
        console.log(this.userForm.value.enterpriseId);
        console.log(this.userForm.value.email);
      },
      err => {
        console.log(`err user = ${err}`);
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  addRole(role: string) {
    this.roles.push(role);
  }

  removeRole(i: number) {
    this.roles.splice(i, 1);
  }

  get userFormWithRolesInvalid() {
    this.userForm.clearValidators();
    if (this.userForm.invalid) {
      return true;
    } else {
      if (this.roles == null || this.roles.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  addUser() {
    const newUser = Object.assign({}, this.user, this.userForm.value);
    newUser.roles = this.roles;
    this.appAdminService.addUser(newUser).subscribe(
      res => {
        console.log(`res = ${res}`);
        // if (this.userForm.controls.isEmployee.value) {
        //   this.addEmployee();
        // }
        this.toastService.show('User added successfully.');
        this.activeModal.close(true);
      },
      err => {
        this.toastService.show(err.error[''][0], { classname: 'bg-danger text-light', delay: 3000 });
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  updateUser() {
    const existingUser = Object.assign({}, this.user, this.userForm.value);
    existingUser.roles = this.roles;
    console.log(`updating request of user = ${JSON.stringify(existingUser)}`);
    this.appAdminService.updateUser(existingUser).subscribe(
      res => {
        console.log(`edit successfull = ${res}`);
        this.activeModal.close(true);
        this.toastService.show('User edited successfully.', { classname: 'bg-success text-light', delay: 3000 });
      },
      err => {
        console.log(`error while editing = ${JSON.stringify(err)}`);
        this.toastService.show(err.error[''][0], { classname: 'bg-danger text-light', delay: 3000 });
      }
    );
  }

  save() {
    if (this.action == 'Add') {
      this.addUser();
    }
    if (this.action == 'Edit') {
      this.updateUser();
      // this.updateEmployee();
    }
  }
}
