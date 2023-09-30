import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
// import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { MasterService } from '../master.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { ToastService } from '@app/shared/services/toast.service';
import { PaginationControlsService } from '@app/shared/pagination-controls.service';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  closeResult: string | undefined;
  total$: Observable<number> | undefined;
  roles: any = [];
  searchTerm = '';
  pageNumber = 10;
  pageSize = 1;
  numberOfRoles = 0;
  isLoading = false;
  filter: FormControl = new FormControl('');

  // @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    //private service: MasterService,
    private appAdminService: AppAdminService,
    private paginationSevice: PaginationControlsService
  ) {
    this.pageNumber = this.paginationSevice.pageNumber;
    this.pageSize = this.paginationSevice.pageSize;
  }

  ngOnInit() {
    this.getAllRoles();

    // this.getRecordsBasedOnSearch(this.filter.value);

    //   this.filter.valueChanges.pipe(
    //     debounceTime(1000), distinctUntilChanged())
    //     .subscribe(res => {
    //       this.getRecordsBasedOnSearch(res);
    //     }) ;
  }

  getAllRoles() {
    this.isLoading = true;
    this.appAdminService.getAllRoles().subscribe((roles: any) => {
      // this.appAdminService.getAllRoleNames().subscribe((roles: any) => {
      this.roles = roles;
      this.numberOfRoles = roles.length;
      // this.getRoles();
      this.isLoading = false;
    });
  }

  // getRoles() {
  //   this.isLoading = true;
  //   // this.appAdminService.getRoles(this.pageNumber, this.pageSize).subscribe(roles => {
  //   this.appAdminService.getRoleNames(this.pageNumber, this.pageSize).subscribe(roles => {
  //       this.roles = roles;
  //     this.isLoading = false;
  //   });
  // }

  getRecordsBasedOnSearch(filterValue: any) {
    this.isLoading = true;

    this.appAdminService.getPrismRoles(filterValue, this.pageNumber, this.pageSize).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.numberOfRoles = res.recordCount;
          this.roles = res.records;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  openAddRoleModal() {
    // this.roleId = 0;
    const modalRef = this.modalService.open(RolesFormComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true
    });
    // modalRef.componentInstance.role = {};
    modalRef.componentInstance.action = 'Add';

    modalRef.result.then(
      result => {
        if (result) {
          // this.addRole(result);
          modalRef.close();
          // this.getRoles();
          this.getRecordsBasedOnSearch(this.filter.value);
        }
      },
      err => {
        // console.log(`err = ${JSON.stringify(err)}`);
        // this.toastService.show('Something went wrong, Please try again later', {
        //   classname: 'bg-danger text-light',
        //   delay: 3000
        // });
      }
    );
  }

  // editRole(role: any) {
  //   this.service.editRole(role).subscribe(
  //     (res : any) => {
  //       this.toastService.show('Role updated successfully', { classname: 'bg-success text-light', delay: 3000 });
  //       this.getRoles();
  //     },
  //     (err : any) => {
  //       // console.log(`error while editing = ${err}`);
  //       // this.toastService.show('Something went wrong, Please try again later', {
  //       //   classname: 'bg-danger text-light',
  //       //   delay: 3000
  //       // });
  //     }
  //   );
  // }

  editRoleModal(role: any) {
    const modalRef = this.modalService.open(RolesFormComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true
    });
    modalRef.componentInstance.role = role;

    // modalRef.componentInstance.roleId = role.recId;
    // modalRef.componentInstance.name = role.name; // user;
    modalRef.componentInstance.action = 'Edit';

    modalRef.result.then(
      result => {
        if (result) {
          modalRef.close();
          this.getAllRoles();
          // this.getRecordsBasedOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  openEditModal(role: any) {
    const modalRef = this.modalService.open(RolesFormComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.role = role;
    modalRef.componentInstance.action = 'Edit';

    modalRef.result.then(
      result => {
        if (result) {
          // this.editRole(result);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }
  deleteRole(role: any) {
    this.appAdminService.deleteRole(role).subscribe(
      res => {
        // console.log(Role deleted successfully = ${res});
        this.toastService.show('Role deleted successfully', { classname: 'bg-success text-light', delay: 3000 });
        // this.getRoles();
        this.getRecordsBasedOnSearch(this.filter.value);
      },
      err => {
        console.log(JSON.stringify(err));
        this.toastService.show(err.error, { classname: 'bg-danger text-light', delay: 3000 });
      }
    );
  }

  confirmDelete(role: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = `Are you sure you want to delete ${role.name}?`;

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteRole(role);
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
    this.getRecordsBasedOnSearch(this.filter.value);
    // this.getRoles();
    // console.log(`pageOptions = ${JSON.stringify(pageOptions)}`);
  }
}
