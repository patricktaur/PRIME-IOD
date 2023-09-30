import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';
import { updateRequestFilters } from '@app/prism/requests/user-requests/update/update-request-filter/update-request-filters';

@Component({
  selector: 'app-update-request-list',
  templateUrl: './update-request-list.component.html',
  styleUrls: ['./update-request-list.component.css']
})
export class UpdateRequestListComponent implements OnInit {
  title = 'abcd';
  isLoading = false;
  records: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: updateRequestFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    status: [0],
    requestedBy: [],
    requestDateFrom: '',
    requestDateTo: '',
    isActioned: [0]
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private requestsService: RequestsUserService // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private studyrequestsEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.requestsService.UpdateRequestUserList().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  get filteredRecords() {
    let studyNameLower = '';

    studyNameLower = this.selectedFilters.iconNumberOrName.toLowerCase();
    studyNameLower = studyNameLower.toLowerCase();

    let filter1 = this.records;
    if (this.selectedFilters.iconNumberOrName.length > 0) {
      filter1 = null;
      filter1 = this.records.filter(
        (x: any) =>
          x.displayName
            ?.toString()
            .toLowerCase()
            .indexOf(this.selectedFilters.iconNumberOrName) != -1 ||
          x.displayName
            ?.toString()
            .toLowerCase()
            .indexOf(studyNameLower) != -1
      );
    }

    let filter5 = filter1;
    if (this.selectedFilters.requestDateFrom && this.selectedFilters.requestDateFrom.length > 0) {
      filter5 = null;
      // filter5 = filter4.filter((n: any) => this.dmpmsFilters.indexOf(n.currentDmpmid) !=-1);
      filter5 = filter1.filter(
        (n: any) => new Date(n.requestedOn).getTime() >= new Date(this.selectedFilters.requestDateFrom).getTime()
      );
    }

    let filter6 = filter5;
    if (this.selectedFilters.requestDateTo && this.selectedFilters.requestDateTo.length > 0) {
      filter6 = null;
      // filter5 = filter4.filter((n: any) => this.dmpmsFilters.indexOf(n.currentDmpmid) !=-1);
      filter6 = filter5.filter(
        (n: any) => new Date(n.requestedOn).getTime() <= new Date(this.selectedFilters.requestDateTo).getTime()
      );
    }

    let filter7 = filter6;
    if (this.selectedFilters.requestedBy && this.selectedFilters.requestedBy.length > 0) {
      filter7 = null;
      filter7 = filter6.filter((n: any) => this.selectedFilters.requestedBy.indexOf(n.requestedBy) != -1);
    }

    let filter8 = filter7;
    if (this.selectedFilters.isActioned && this.selectedFilters.isActioned.length > 0) {
      filter8 = null;
      //filter7? workaround for  unddefined filter7 :
      filter8 = filter7?.filter((n: any) => this.selectedFilters.isActioned.indexOf(n.isActioned) != -1);
    }

    return filter8;
  }

  onFilterChange(filters: updateRequestFilters) {
    this.selectedFilters = filters;

    this.loadReport();
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      // case 'delete':
      //   const msg = 'Are you sure? you want to delete Request ID: ' + id;
      //   this.confirmDelete(msg, id);
      //   break;

      default:
        break;
    }
  }

  add() {
    this.router.navigate(['update-request-edit'], {
      relativeTo: this.actRoute.parent,
      // queryParams: { editMode: 'add', studyId: this.studyId }
      queryParams: { editMode: 'add' }
    });
  }

  edit(id: number) {
    this.router.navigate(['update-request-edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  // deleteRecord(recId: number) {
  //   this.deleteRecordSub = this.requestsService.UpdateRequestUserDelete(recId).subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         return;
  //       } else {
  //         //sucess:
  //         this.removeRecord(recId);
  //       }
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       // this.isLoading = false;
  //     }
  //   );
  // }

  // confirmDelete(message: any, recId: number) {
  //   const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  //   modalRef.componentInstance.confirmationText = message;

  //   modalRef.result.then(
  //     result => {
  //       if (result === 'confirm') {
  //         this.deleteRecord(recId);
  //       }
  //     },
  //     err => {
  //       console.log(`err = ${JSON.stringify(err)}`);
  //     }
  //   );
  // }

  // removeRecord(id: number): void {
  //   let found = false;
  //   for (let i = 0; i < this.records.length; i++) {
  //     if (this.records[i][this.keyField] === id) {
  //       this.records.splice(i--, 1);
  //       found = true;
  //     }
  //   }
  //   if (found == false) {
  //     console.log(`No record found for keyfield: ${this.keyField}, keyValue: ${id}`);
  //   }
  // }
  columns: Array<any> = [
    {
      header: 'Actions',
      field: 'recId',
      actionType: 'raise-event',
      linkText: 'Open',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },

    {
      header: 'Request Id',
      field: 'recId',
      align: 'Center'
    },
    {
      header: 'Name',
      field: 'displayName'
    },
    {
      header: 'Email ID',
      field: 'emailId'
    },
    {
      header: 'Employee ID',
      field: 'employeeId'
    },
    {
      header: 'Enterprise ID',
      field: 'enterpriseId',
      hide: true
    },
    {
      header: 'Joining Date',
      field: 'joiningdate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Role',
      field: 'role',
      hide: true
    },
    // {
    //   header: 'Role',
    //   field: 'rolePid'
    // },
    {
      header: 'Operating Division',
      field: 'operatingDivisionPDescription'
    },
    {
      header: 'Office Region',
      field: 'officeRegionPDescription'
    },
    {
      header: 'Office Country',
      field: 'officeCountryPDescription'
    },
    {
      header: 'Requestor Comment',
      field: 'requesterComments',
      hide: true
    },
    {
      header: 'Time Zone',
      field: 'timeZoneId',
      hide: true
    },
    {
      header: 'Start Date in Clinical Industory',
      field: 'month',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center',
      hide: true
    },
    {
      header: 'Requested By',
      field: 'requestedBy'
    },
    {
      header: 'Requested On',
      field: 'requestedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
}
