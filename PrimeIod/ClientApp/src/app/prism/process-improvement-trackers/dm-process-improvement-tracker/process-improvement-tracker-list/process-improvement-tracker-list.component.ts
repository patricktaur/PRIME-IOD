import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { DmProcImpTrackerFiltersFilters } from '../dm-proc-imp-tracker-filters';
import { ProcessImprovementTrackerService } from '../process-improvement-tracker-service';
import { DMProcImpTrackerFilterService } from '../process-improvement-tracker-filter.service';

@Component({
  selector: 'app-process-improvement-tracker-list',
  templateUrl: './process-improvement-tracker-list.component.html',
  styleUrls: ['./process-improvement-tracker-list.component.css']
})
export class ProcessImprovementTrackerListComponent implements OnInit, OnDestroy {
  loading = false;

  title = 'DM Process Improvement Tracker';

  selectedFilters: DmProcImpTrackerFiltersFilters = {
    pageNumber: 1,
    pageSize: 10,
    id: '',
    requestor: [],
    processImprovementStatus: [],
    billable: [],
    processImprovementCategory: [],
    processLead: [],
    sopWpGuidelineImpacted: [],
    trainingDevelopedRolledOut: []
  };
  keyField = 'recId';

  records: any;

  pageNumber = 1;
  pageSize = 10;

  initialized: boolean = false;
  
  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private processImprovementTrackerService: ProcessImprovementTrackerService,
    private filterService: DMProcImpTrackerFilterService
  ) {}

  // constructor(private ProcessImprovementTrackerLowerEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadRecord();
    this.filterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
      }

      if (this.initialized == false) {
        //workaround: ngbPagination displays page:1 even when page No is not 1
        // to sync with ngbPagination, the selectedFilters received from cdsDevTaskFilterService is set to 1
        // so that the records related to page 1 are displayed.
        this.selectedFilters.pageNumber = 1;

        this.initialized = true;
      }
    });
  }

  loadRecord() {
    // this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
    this.loadRecordSub = this.processImprovementTrackerService.getList().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  get filteredRecords() {
    let filter1 = this.records;
    if (this.selectedFilters?.id.length > 0) {
      filter1 = null;
      filter1 = this.records.filter((x: any) => x.recId.toString() === this.selectedFilters?.id);
    }

    let filter2 = filter1;
    if (this.selectedFilters.requestor && this.selectedFilters.requestor.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.selectedFilters.requestor.indexOf(n.requestor) != -1);
    }

    let filter3 = filter2;
    if (this.selectedFilters.processImprovementStatus && this.selectedFilters.processImprovementStatus.length > 0) {
      filter3 = null;
      filter3 = filter2.filter(
        (n: any) => this.selectedFilters.processImprovementStatus.indexOf(n.processImprovementStatusId) != -1
      );
    }

    let filter4 = filter3;
    if (this.selectedFilters.billable && this.selectedFilters.billable.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.selectedFilters.billable.indexOf(n.billableOrNoBillable) != -1);
    }

    let filter5 = filter4;
    if (this.selectedFilters.processImprovementCategory && this.selectedFilters.processImprovementCategory.length > 0) {
      filter5 = null;
      filter5 = filter4.filter(
        (n: any) => this.selectedFilters.processImprovementCategory.indexOf(n.processImprovementCategory) != -1
      );
    }

    let filter6 = filter5;
    if (this.selectedFilters.processLead && this.selectedFilters.processLead.length > 0) {
      filter6 = null;
      filter6 = filter5.filter((n: any) => this.selectedFilters.processLead.indexOf(n.processLead) != -1);
    }

    let filter7 = filter6;
    if (this.selectedFilters.sopWpGuidelineImpacted && this.selectedFilters.sopWpGuidelineImpacted.length > 0) {
      filter7 = null;
      filter7 = filter6.filter(
        (n: any) => this.selectedFilters.sopWpGuidelineImpacted.indexOf(n.sopWpGuidelineImpacted) != -1
      );
    }

    let filter8 = filter7;
    if (this.selectedFilters.trainingDevelopedRolledOut && this.selectedFilters.trainingDevelopedRolledOut.length > 0) {
      filter8 = null;
      filter8 = filter7.filter(
        (n: any) => this.selectedFilters.trainingDevelopedRolledOut.indexOf(n.trainingDevelopedAndRolledOut) != -1
      );
    }

    return filter8;
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      case 'delete':
        const msg = 'Deleting . . .';
        this.confirmDelete(msg, id);
        break;

      default:
        break;
    }
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
  }

  edit(id: number) {
    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.processImprovementTrackerService.deleteRecord(recId).subscribe(
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
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteRecord(recId);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  // add() {
  //   this.router.navigate(['edit'], {
  //     relativeTo: this.actRoute.parent,
  //     queryParams: { editMode: 'add' }
  //   });
  // }

  onResetFilters() {
    this.filterService.resetFilters();
  }

  add(): void {
    this.router.navigate(['new'], { relativeTo: this.actRoute.parent, state: { id: 0 } });
  }

  removeRecord(id: number): void {
    for (let i = 0; i < this.records.length; i++) {
      //if (this.records[i].recId === id) {
      let row = this.records[i];
      if (this.records[i][this.keyField] === id) {
        this.records.splice(i--, 1);
      }
    }
  }

  //***Todo***
  columns: Array<any> = [
    {
      header: 'Open',
      field: 'recId',
      actionType: 'link',
      linkField: 'recId',
      linkPath: 'item-group' //working
    },
    // {
    //   header: 'Edit',
    //   actionType: 'raise-event',
    //   linkText: 'Edit',
    //   actionCommand: 'edit',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    // {
    //   header: 'Delete',
    //   actionType: 'raise-event',
    //   linkText: 'Delete',
    //   actionCommand: 'delete',
    //   actionField: 'recId',
    //   actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    // },
    {
      header: 'Process Improvement Id',
      field: 'recId',
      align: 'right'
    },
    {
      header: 'Created Date',
      field: 'createdOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Due Date',
      field: 'dueDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Requestor',
      field: 'requestor'
    },
    {
      header: 'Process Improvement Status',
      field: 'processImprovementStatus'
    },
    {
      header: 'Billable/No Billable',
      field: 'billableOrNoBillable'
    },
    {
      header: 'Process Improvement Category',
      field: 'processImprovementCategory'
    },
    {
      header: 'Process Improvement Sub Category',
      field: 'processImprovementSubCategory'
    },
    {
      header: 'scope of initiative',
      field: 'scopeOfInitiative',
      width: 50
    },
    {
      header: 'Process Improvement Documentation Location Including action log',
      field: 'processImprovementDocLocation',
      width: 50
    },
    {
      header: 'Process Lead',
      field: 'processLead'
    },
    {
      header: 'Functional Areas Impacted',
      field: 'functionalAreasImpactedValues',
      width: 50
    },
    {
      header: 'Sub Team',
      field: 'subTeamValues',
      width: 50
    },
    {
      header: 'SOP/WP/Guideline Impacted',
      field: 'sopWpGuidelineImpacted'
    },
    {
      header: 'Final Process Documentation Location',
      field: 'finalProcessDocLocation'
    },
    {
      header: 'Training Developed and rolled out',
      field: 'trainingDevelopedAndRolledOut'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
