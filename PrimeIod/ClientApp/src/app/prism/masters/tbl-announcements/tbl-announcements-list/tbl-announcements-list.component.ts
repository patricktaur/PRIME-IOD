import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@app/shared/services/toast.service';
import { PaginationControlsService } from '@app/shared/pagination-controls.service';
import { TblAnnouncementsService } from '../tbl-announcements.service';

//Required for Edit Comp only
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { TblAnnouncementsEditComponent } from './tbl-announcements-edit/tbl-announcements-edit.component';
@Component({
  // selector: 'app-users',
  // templateUrl: './users.component.html',
  // styleUrls: ['./users.component.css'],
  // providers: [UserFormComponent]  //remove ?.
  selector: 'app-tbl-announcements',
  templateUrl: './tbl-announcements-list.component.html',
  styleUrls: ['./tbl-announcements-list.component.css']
})
export class TblAnnouncementsListComponent implements OnInit {
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
    private tblAnnouncementsService: TblAnnouncementsService,
    private toastService: ToastService,
    private paginationSevice: PaginationControlsService
  ) {
    this.pageNumber = this.paginationSevice.pageNumber;
    this.pageSize = this.paginationSevice.pageSize;
  }

  ngOnInit() {
    // this.getUsers();
    this.getRecordsBasedOnSearch(this.filter.value);
    this.filter.valueChanges.subscribe(value => {
      this.getRecordsBasedOnSearch(value);
    });
  }

  getRecordsBasedOnSearch(filterValue: any) {
    this.isLoading = true;

    this.tblAnnouncementsService.getRecordsBasedOnSearch(filterValue, this.pageNumber, this.pageSize).subscribe(
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
  addTblAnnouncementsModal() {
    const modalRef = this.modalService.open(TblAnnouncementsEditComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.tblAnnouncements = {};
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
  editTblAnnouncementsModal(tblAnnouncements: any) {
    const modalRef = this.modalService.open(TblAnnouncementsEditComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.tblAnnouncementsId = tblAnnouncements.recId;
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
  deleteTblAnnouncements(tblAnnouncements: any) {
    this.tblAnnouncementsService.deleteTblAnnouncements(tblAnnouncements).subscribe(
      res => {
        // console.log(`User deleted successfully = ${res}`);
        this.toastService.show('TblAnnouncements deleted successfully.', {
          classname: 'bg-success text-light',
          delay: 3000
        });
        this.getRecordsBasedOnSearch(this.filter.value);
      },
      err => {
        console.log(`Error while deleting. = ${err}`);
      }
    );
  }

  confirmDeleteTblAnnouncements(tblAnnouncements: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = `Are you sure you want to delete ${tblAnnouncements.title} ?`; //todo: replace title with field name

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteTblAnnouncements(tblAnnouncements);
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
