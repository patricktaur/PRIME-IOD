import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './user-form/user-form.component';
//import { MasterService } from '../master.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';
import { ToastService } from '@app/shared/services/toast.service';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { PaginationControlsService } from '@app/shared/pagination-controls.service';
import { FormControl } from '@angular/forms';

import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserFormComponent]
})
export class UsersComponent implements OnInit {
  users: any = [];
  searchTerm = '';
  isDataLoaded = false;
  isLoading = false;
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filter: FormControl = new FormControl('');
  private uploadResponse: any;
  closeResult: string | undefined;

  constructor(
    //public service: MasterService,
    private modalService: NgbModal,
    //private masterService: MasterService,
    private appAdminService: AppAdminService,
    private toastService: ToastService,
    private paginationSevice: PaginationControlsService
  ) {
    this.pageNumber = this.paginationSevice.pageNumber;
    this.pageSize = this.paginationSevice.pageSize;
  }

  ngOnInit() {
    this.getUsersOnSearch(this.filter.value);
    // this.filter.valueChanges.subscribe(value => {
    //   this.getUsersOnSearch(value);
    // });

    this.filter.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(res => {
      this.getUsersOnSearch(this.filter.value);
    });
  }

  // getUsers(filterValue: any) {

  //   this.isLoading = true;

  //   this.appAdminService.getUsersByFilter(this.pageNumber, this.pageSize).subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         return;
  //       } else {
  //         this.totalItems = res.length; //res.recordCount;
  //         console.log("XXXX:" + JSON.stringify(res));
  //         // this.users = res.records;
  //         this.users = res;
  //       }
  //       this.isLoading = false;
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       this.isLoading = false;
  //     }
  //   );
  // }

  getUsersOnSearch(filterValue: any) {
    this.isLoading = true;

    this.appAdminService.getUsersBasedOnSearch(filterValue, this.pageNumber, this.pageSize).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.totalItems = res.recordCount;
          this.users = res.records;
        }
        this.isLoading = false;
      },
      err => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // addUser(user: any) {
  //   user[`currentPassword`] = 'tempP@ss123';
  //   user[`newPassword`] = 'tempP@ss123';
  //   user[`userName`] = user.firstName + user.lastName;
  //   this.service.addUser(user).subscribe(
  //     res => {
  //       this.toastService.show('User added successfully.');
  //       this.getUsers();
  //     },
  //     err => {
  //       console.log(`err = ${JSON.stringify(err)}`);
  //     }
  //   );
  // }

  addUserModal() {
    const modalRef = this.modalService.open(UserFormComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.user = {};
    modalRef.componentInstance.action = 'Add';

    modalRef.result.then(
      result => {
        if (result) {
          // result.roles = this.removeNonSelectedRolesFromRoles(result.roles);
          // this.addUser(result);
          this.getUsersOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  editUserModal(user: any) {
    const modalRef = this.modalService.open(UserFormComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.userId = user.recId; //user;
    modalRef.componentInstance.employeeNumber = user.employeeNumber;
    modalRef.componentInstance.isUserEmployee = user.isEmployee;
    modalRef.componentInstance.action = 'Edit';

    modalRef.result.then(
      result => {
        if (result) {
          // this.editUser(result);
          console.log(`result = ${result}`);
          this.getUsersOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  deleteUser(user: any) {
    this.appAdminService.deleteUser(user).subscribe(
      (res: any) => {
        // console.log(`User deleted successfully = ${res}`);
        this.toastService.show('User deleted successfully.', { classname: 'bg-success text-light', delay: 3000 });
        this.getUsersOnSearch(this.filter.value);
      },
      (err: any) => {
        console.log(`Error while deleting. = ${err}`);
      }
    );
  }

  confirmDeleteUser(user: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = `Are you sure you want to delete ${user.email}?`;

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteUser(user);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
    this.getUsersOnSearch(this.filter.value);
    // console.log(`pageOptions = ${JSON.stringify(pageOptions)}`);
  }
}
