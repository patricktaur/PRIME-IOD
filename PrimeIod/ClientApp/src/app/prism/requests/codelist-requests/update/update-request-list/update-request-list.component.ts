import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
// import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';
import { RequestsCodeListService } from '@app/prism/requests/codelist-requests/requests-codelist.service';

import { CodelistRequestFilters } from '@app/prism/requests/codelist-requests/update/update-request-filter/codelist-request-filters';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-update-request-list',
  templateUrl: './update-request-list.component.html',
  styleUrls: ['./update-request-list.component.css']
})
export class UpdateRequestListComponent implements OnInit {
  title = 'abcd';
  isLoading = false;
  LoggedinUserId = '';
  records: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: CodelistRequestFilters = {
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
    private requestsService: RequestsCodeListService, // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
    private credSerivce: CredentialsService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private studyrequestsEditService: StudyEditAService) {}

  ngOnInit(): void {
    // this.selectedFilters.requestedBy[parseInt(this.credSerivce.currentUser.id)];
    //this.selectedFilters.requestedBy[0]=this.credSerivce.currentUser.fullName;
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    if(this.credSerivce.currentUser.id) {
      this.LoggedinUserId = this.credSerivce.currentUser.id;
    }
    
    this.requestsService.UpdateRequestCodelistList().subscribe(
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
        //description codelistNameDescription
        (x: any) =>
          x.description
            ?.toString()
            .toLowerCase()
            .indexOf(this.selectedFilters.iconNumberOrName) != -1 ||
          x.description
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

  onFilterChange(filters: CodelistRequestFilters) {
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
      actionType: 'raise-event',
      linkText: 'Open',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription', // this?.messageFieldForDelete
      expressionProperties: {
        'templateOptions.disabled': this.LoggedinUserId == 'createdById'
      }
    },
    // {
    //   header: 'Delete',
    //   actionType: 'raise-event',
    //   linkText: 'Delete',
    //   actionCommand: 'delete',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription'
    // },
    {
      header: 'Request Id',
      field: 'recId',
      align: 'Center'
    },
    // {
    //   header: 'Codelist Name',
    //   field: 'codeListNameDescription'
    // },
    {
      header: 'Order Number',
      field: 'orderNumber'
    },
    {
      header: 'Description',
      field: 'description'
    },

    {
      header: 'Requested By',
      field: 'requestedById'
    },
    {
      header: 'Requested On',
      field: 'requestedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Status',
      field: 'isActionedText'
    },
    {
      header: 'Actioned by',
      field: 'approvedById'
    },
    {
      header: 'Actioned on',
      field: 'approvedOn',
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
