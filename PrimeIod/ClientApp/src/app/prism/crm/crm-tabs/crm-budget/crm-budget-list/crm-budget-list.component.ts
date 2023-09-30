import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { CrmBudgetEditService } from '@app/prism/crm/crm-tabs/crm-budget-edit.service';
import { crmBudgetFilters } from '@app/prism/crm/crm-tabs/crm-budget/crm-budget-filter';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTypeRedirectionService } from '@app/prism/study/study-type-redirection.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-crm-budget-list',
  templateUrl: './crm-budget-list.component.html',
  styleUrls: ['./crm-budget-list.component.css']
})
export class CrmBudgetListComponent implements OnInit {
  title = 'abcd';
  isLoading = false;
  studyId: number = 0;
  records: any;
  study: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  mode: string = "";
  viewMode : boolean = false;
  showFooterActions = true;

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  selectedFilters: crmBudgetFilters = {
    pageNumber: 1,
    pageSize: 10,
    // iconNumberOrName: '',
    // region: [],
    //portfolio: [],
    //status: [0],
    //specialProject: [],
    //requestedBy: [],
    requestDateFrom: '',
    requestDateTo: '',
    // isActioned: [1201]
    ContractKim:[]
  };

  // hasCrmManagerRole: boolean = false;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private studyEditService: StudyEditService,
    private credentialsService: CredentialsService,
    private requestsService: CrmBudgetEditService, // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
    private studyTypeRedirectionService: StudyTypeRedirectionService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private studyrequestsEditService: StudyEditAService) {}

  ngOnInit(): void {
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];
    this.showFooterActions = this.mode !== 'view' ? true : false;
    if (this.mode === 'view') {
      //remove edit - del button columns
      this.columns.splice(0, 2);
      this.viewMode = true;
    }
    
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;

      // this.hasCrmManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CRM_Central_Monitor);
      
      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        this.loadRecord(this.studyId);
      }
    });
  }

  loadRecord(studyId: number) {
    this.isLoading = true;
    this.requestsService.getCrmStudyRequestAllRecords(studyId).subscribe(
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

    let filter5 = this.records;
    if (this.selectedFilters.ContractKim && this.selectedFilters.ContractKim.length > 0) {
      filter5 = null;
       filter5 = this.records.filter((n: any) => this.selectedFilters.ContractKim.indexOf(n.contractedKomCraMeetingsCpId) !=-1);
      // filter5 = this.records.filter(
      //   (n: any) => new Date(n.contractedKomCraMeetingsCp).getTime() >= new Date(this.selectedFilters.requestDateFrom).getTime()
      // );
    }

    let filter6 = this.records;
    if (this.selectedFilters.requestDateFrom && this.selectedFilters.requestDateFrom.length > 0) {
      filter6 = null;
      // filter5 = filter4.filter((n: any) => this.dmpmsFilters.indexOf(n.currentDmpmid) !=-1);
      filter6 = filter5.filter(
        (n: any) => new Date(n.currentBudgetDate).getTime() >= new Date(this.selectedFilters.requestDateFrom).getTime()
      );
    }

    let filter7 = filter6;
    if (this.selectedFilters.requestDateTo && this.selectedFilters.requestDateTo.length > 0) {
      filter7 = null;
      // filter5 = filter4.filter((n: any) => this.dmpmsFilters.indexOf(n.currentDmpmid) !=-1);
      filter7 = filter6.filter(
        (n: any) => new Date(n.currentBudgetDate).getTime() <= new Date(this.selectedFilters.requestDateTo).getTime()
      );
    }

    return filter7;
  }

  onFilterChange(filters: crmBudgetFilters) {
    this.selectedFilters = filters;

    this.loadRecord(this.studyId);
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
        console.log('called');
        break;
    }
  }

  add() {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      // queryParams: { editMode: 'add', studyId: this.studyId }
      queryParams: { editMode: 'add' }
    });
  }

  edit(id: number) {
    // console.log(this.actRoute.parent);

    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.requestsService.deleteBudget(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:

          this.isLoading = false;
          this.router.navigate(['list'], { relativeTo: this.actRoute.parent });
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
      header: 'Budget',
      field: 'currentBudget',
      align: 'center'
    },
    {
      header: 'Budget Date',
      field: 'currentBudgetDateFormatted'
    },
    {
      header: 'Plan View Activity Tasks',
      field: 'planViewActivityTasks'
    },

    {
      header: 'Contracted KOM, CRAmeetings',
      field: 'contractedKomCraMeetingsCp'
    },
    {
      header: 'Number of CDA analysis rounds for the study',
      field: 'numberOfCdaAnalysisRounds'
    },
    {
      header: 'CDA oversight and QC (hours per review)',
      field: 'cdaOversightAndQc'
    },
    {
      header: 'Total CRM Budget Value',
      field: 'totalCrmbudgetValue'
    },
    {
      header: 'Currency Type',
      field: 'currencyType'
    },
    {
      header: 'ICONIK for Medica Review',
      field: 'iconikForMedicalReview'
    },
    {
      header: 'Complexity Factor - CDA',
      field: 'complexityFactorCda'
    },
    {
      header: 'Central Monitoring Reporting Complexity',
      field: 'centralMonitoringReportingComplexity'
    },

 
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadRecord(this.studyId);
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    //this.deleteRecordSub?.unsubscribe();
  }
}
