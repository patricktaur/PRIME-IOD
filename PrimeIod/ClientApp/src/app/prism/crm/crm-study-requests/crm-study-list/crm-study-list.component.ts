import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { CrmStudyRequestService } from '@app/prism/crm/crm-study-requests/crm-study-request-service';
import { crmStudyFilters } from '@app/prism/crm/crm-study-requests/crm-study-filters';

@Component({
  selector: 'app-crm-study-list',
  templateUrl: './crm-study-list.component.html',
  styleUrls: ['./crm-study-list.component.css']
})
export class CrmStudyListComponent implements OnInit {
  title = 'abcd';
  isLoading = false;
  records: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: crmStudyFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    region: [],
    portfolio: [],
    status: [0],
    specialProject: [],
    requestedBy: [],
    requestDateFrom: '',
    requestDateTo: '',
    isActioned: [1201]
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private requestsService: CrmStudyRequestService // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private studyrequestsEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.requestsService.getCrmStudyRequestAllRecords().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          console.log('Records:');
          console.log(res);
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
          x.studyIconNumber
            ?.toString()
            .toLowerCase()
            .indexOf(this.selectedFilters.iconNumberOrName) != -1 ||
          x.studyName
            ?.toString()
            .toLowerCase()
            .indexOf(studyNameLower) != -1
      );
    }

    // let filter2 = filter1;
    // if (this.selectedFilters.region && this.selectedFilters.region.length > 0) {
    //   filter2 = null;
    //   filter2 = filter1.filter((n: any) => this.selectedFilters.region.indexOf(n.regionPDescription) != -1);
    // }

    // let filter3 = filter2;
    // if (this.selectedFilters.portfolio && this.selectedFilters.portfolio.length > 0) {
    //   filter3 = null;
    //   filter3 = filter2.filter((n: any) => this.selectedFilters.portfolio.indexOf(n.portfolioPDescription) != -1);
    // }

    // let filter4 = filter2;
    // if (this.selectedFilters.specialProject && this.selectedFilters.specialProject.length > 0) {
    //   filter4 = null;
    //   filter4 = filter3.filter(
    //     (n: any) => this.selectedFilters.specialProject.indexOf(n.specialProjectPid?.toLowerCase()) != -1
    //   );
    // }

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
      filter8 = filter7?.filter((n: any) => this.selectedFilters.isActioned.indexOf(n.statusCpId) != -1);
    }

    return filter8;
  }

  onFilterChange(filters: crmStudyFilters) {
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
      case 'delete':
        const msg = "Deleting . . .'";
        this.confirmDelete(msg, id);
        break;

      default:
        break;
    }
  }

  add() {
    this.router.navigate(['crm-study-edit'], {
      relativeTo: this.actRoute.parent,
      // queryParams: { editMode: 'add', studyId: this.studyId }
      queryParams: { editMode: 'add' }
    });
  }

  edit(id: number) {
    this.router.navigate(['crm-study-edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.requestsService.deleteStudyRequest(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.removeRecord(recId);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  confirmDelete(message: any, recId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = message;

    modalRef.result.then(
      result => {
        if (result === 'confirm') {
          this.deleteRecord(recId);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  removeRecord(id: number): void {
    let found = false;
    for (let i = 0; i < this.records.length; i++) {
      if (this.records[i][this.keyField] === id) {
        this.records.splice(i--, 1);
        found = true;
      }
    }
    if (found == false) {
      console.log(`No record found for keyfield: ${this.keyField}, keyValue: ${id}`);
    }
  }

  columns: Array<any> = [
    {
      header: 'Actions',
      actionType: 'raise-event',
      linkText: 'Open',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    // {
    //   header: 'Delete',
    //   actionType: 'raise-event',
    //   linkText: 'Delete',
    //   actionCommand: 'delete',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    {
      header: 'Request Id',
      field: 'recId',
      align: 'right'
    },
    {
      header: 'Icon Number',
      field: 'studyIconNumber'
    },
    {
      header: 'Study name',
      field: 'studyName'
    },
    {
      header: 'Sponsor',
      field: 'sponsor'
    },

    {
      header: 'Sponsor Study no.',
      field: 'sponsorStudyNo'
    },
    {
      header: 'Global Project Manager',
      field: 'globalProjectManager'
    },
    {
      header: 'CDMS / EDC System',
      field: 'cdmsEdcSystem'
    },
    {
      header: 'ICON DM Contracted ',
      field: 'iconDmContracted'
    },
    {
      header: 'DM Vendor',
      field: 'dmVendor'
    },
    {
      header: 'Requestor Comments',
      field: 'requestorComments'
    },
    {
      header: 'Requested By',
      field: 'requestedBy'
    },

    {
      header: 'Requested On',
      field: 'requestedOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'status',
      field: 'status'
    }
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
}
