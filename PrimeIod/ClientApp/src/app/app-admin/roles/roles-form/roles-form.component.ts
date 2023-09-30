import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { MasterService } from '@app/masters/master.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  // @Input() roleId: string;
  // @Input() name: string;
  @Input() role: any = {};
  @Input() action = '';
  permissions: any = [];
  roleForm: FormGroup = new FormGroup({});
  // role: any;
  assignedPermissions: any = [];

  constructor(
    private modalService: NgbModal,
    //private masterService: MasterService,
    private appAdminService: AppAdminService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadPermissions();
    this.buildForm();

    if (this.action === 'Edit') {
      this.loadRole();
    }
  }

  loadRole() {
    this.appAdminService.getRole(this.role.id).subscribe((role: any) => {
      // role.permissions = role.permissions.sort(function(a: any, b: any){
      //   return a.name - b.name;
      // });
      this.roleForm.patchValue(role);
      this.assignedPermissions = role.permissions;
      // this.assignedPermissions = this.assignedPermissions.sort((a: any, b: any) => {
      //   return a.name - b.name;
      // })
    });
  }

  loadPermissions() {
    this.appAdminService.getPermissions().subscribe((permissions: any) => {
      this.permissions = permissions;
    });
  }

  get availablePermissions() {
    if (this.permissions == null) {
      return null;
    }
    if (this.assignedPermissions == null) {
      return this.permissions;
    }
    // var that = this;
    return this.permissions.filter(
      (item: any) => this.assignedPermissions.findIndex((x: any) => x.name === item.name) < 0
    );
  }

  // buildForm() {
  //   this.roleForm = this.formBuilder.group({
  //     id: [''],
  //     name: ['', Validators.required]
  //   });
  // }

  buildForm() {
    this.roleForm = this.formBuilder.group({
      id: [this.role.id ? this.role.id : null],
      name: [this.role.name, Validators.required]
    });
  }

  // save() {
  //   //this.activeModal.close(this.roleForm.value);
  //   this.updateRole();
  // }

  save() {
    if (this.action == 'Add') {
      this.addRole();
    }
    if (this.action == 'Edit') {
      this.updateRole();
    }
  }

  addRole() {
    // this.masterService
    //   .createRole({
    //     name: this.role
    //   })
    //   .subscribe((res: any) => {
    //     console.log(JSON.stringify(res));
    //   });
    // this.modalService.dismissAll();

    const newRole = Object.assign({}, this.role, this.roleForm.value);
    newRole.id = null;
    newRole.permissions = this.assignedPermissions;
    this.appAdminService.addRole(newRole).subscribe(
      res => {
        console.log(`res = ${res}`);
        this.toastService.show('Role added successfully', { classname: 'bg-success text-light', delay: 3000 });
        this.activeModal.close(true);
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  updateRole() {
    const existingRole = Object.assign({}, this.role, this.roleForm.value);
    existingRole.permissions = this.assignedPermissions;

    this.appAdminService.editRole(existingRole).subscribe(
      (res: any) => {
        this.activeModal.close(this.roleForm.value);
      },
      (err: any) => {
        // console.log(`error while editing = ${err}`);
        // this.toastService.show('Something went wrong, Please try again later', {
        //   classname: 'bg-danger text-light',
        //   delay: 3000
        // });
      }
    );
  }

  addPermission(permission: any) {
    //this.role.permissions.push(permission);
    this.assignedPermissions.push(permission);
  }

  removePermission(i: number) {
    //this.role.permissions.splice(i, 1);
    this.assignedPermissions.splice(i, 1);
  }
}
