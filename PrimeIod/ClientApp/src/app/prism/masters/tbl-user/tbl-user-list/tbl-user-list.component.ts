import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@app/shared/services/toast.service';
import { PaginationControlsService } from '@app/shared/pagination-controls.service';
import { TblUserService } from '../tbl-user.service';

//Required for Edit Comp only
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { TblUserEditComponent } from './tbl-user-edit/tbl-user-edit.component';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  // selector: 'app-users',
  // templateUrl: './users.component.html',
  // styleUrls: ['./users.component.css'],
  // providers: [UserFormComponent]  //remove ?.
  selector: 'app-tbl-user',
  templateUrl: './tbl-user-list.component.html',
  styleUrls: ['./tbl-user-list.component.css']
})
export class TblUserListComponent implements OnInit {
  records: any = [];
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
    private modalService: NgbModal,
    private tblUserService: TblUserService,
    private toastService: ToastService,
    private paginationSevice: PaginationControlsService
  ) {
    this.pageNumber = this.paginationSevice.pageNumber;
    this.pageSize = this.paginationSevice.pageSize;
  }

  ngOnInit() {
    this.getRecordsBasedOnSearch(this.filter.value);

    this.filter.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(res => {
      this.getRecordsBasedOnSearch(res);
    });
  }

  getRecordsBasedOnSearch(filterValue: any) {
    this.isLoading = true;

    this.tblUserService.getRecordsBasedOnSearch(filterValue, this.pageNumber, this.pageSize).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.totalItems = res.recordCount;
          this.records = res.records;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // For 'Add' option
  addTblUserModal() {
    const modalRef = this.modalService.open(TblUserEditComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.tblUser = {};
    modalRef.componentInstance.action = 'Add';

    modalRef.result.then(
      result => {
        if (result) {
          // result.roles = this.removeNonSelectedRolesFromRoles(result.roles);
          // this.addUser(result);
          this.getRecordsBasedOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  // for Edit Option:
  editTblUserModal(tblUser: any) {
    const modalRef = this.modalService.open(TblUserEditComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.tblUserId = tblUser.recId;
    modalRef.componentInstance.action = 'Edit';

    modalRef.result.then(
      result => {
        if (result) {
          // this.editUser(result);
          console.log(`result = ${result}`);
          this.getRecordsBasedOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  //for delete option
  deleteTblUser(tblUser: any) {
    this.tblUserService.deleteTblUser(tblUser).subscribe(
      res => {
        // console.log(`User deleted successfully = ${res}`);
        this.toastService.show('TblUser deleted successfully.', { classname: 'bg-success text-light', delay: 3000 });
        this.getRecordsBasedOnSearch(this.filter.value);
      },
      err => {
        console.log(`Error while deleting. = ${err}`);
      }
    );
  }

  confirmDeleteTblUser(tblUser: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = `Are you sure you want to delete ${tblUser.displayName} ?`; //todo: replace displayName with field name

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteTblUser(tblUser);
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
    // console.log(`pageOptions = ${JSON.stringify(pageOptions)}`);
  }
}
