import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { DmProcImpTrackerFiltersFilters } from '../dm-proc-imp-tracker-filters';
import { ProcessImprovementTrackerService } from '../process-improvement-tracker-service';
import { DMProcImpTrackerFilterService } from '../process-improvement-tracker-filter.service';

@Component({
  selector: 'app-dm-proc-imp-tracker-report',
  templateUrl: './dm-proc-imp-tracker-report.component.html',
  styleUrls: ['./dm-proc-imp-tracker-report.component.css']
})
export class DmProcImpTrackerReportComponent implements OnInit, OnDestroy {
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

  //  selectedFilters :  DmProcImpTrackerFiltersFilters = new DmProcImpTrackerReportComponent();

  keyField = 'recId';

  records: any;

  pageNumber = 1;
  pageSize = 10;

  // studyIdSub: Subscription;
  loadRecordSub: Subscription | undefined;

  csvfileName = 'DM-Process-Improvement-Tracker.csv';
  initialized: boolean = false;
  // deleteRecordSub: Subscription;
  constructor(
    private processImprovementTrackerService: ProcessImprovementTrackerService,
    private filterService: DMProcImpTrackerFilterService
  ) {}

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

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  get filteredRecords() {
    let filter1 = this.records;
    if (this.selectedFilters?.id.length > 0) {
      filter1 = null;
      filter1 = this.records.filter((x: any) => x.recId.toString() === this.selectedFilters?.id);
    }

    let filter2 = filter1;
    if (this.selectedFilters?.requestor && this.selectedFilters?.requestor.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.selectedFilters.requestor.indexOf(n.requestor) != -1);
    }

    let filter3 = filter2;
    if (this.selectedFilters?.processImprovementStatus && this.selectedFilters?.processImprovementStatus.length > 0) {
      filter3 = null;
      filter3 = filter2.filter(
        (n: any) => this.selectedFilters.processImprovementStatus.indexOf(n.processImprovementStatusId) != -1
      );
    }

    let filter4 = filter3;
    if (this.selectedFilters?.billable && this.selectedFilters?.billable.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.selectedFilters.billable.indexOf(n.billableOrNoBillable) != -1);
    }

    let filter5 = filter4;
    if (
      this.selectedFilters?.processImprovementCategory &&
      this.selectedFilters?.processImprovementCategory.length > 0
    ) {
      filter5 = null;
      filter5 = filter4.filter(
        (n: any) => this.selectedFilters.processImprovementCategory.indexOf(n.processImprovementCategory) != -1
      );
    }

    let filter6 = filter5;
    if (this.selectedFilters?.processLead && this.selectedFilters?.processLead.length > 0) {
      filter6 = null;
      filter6 = filter5.filter((n: any) => this.selectedFilters.processLead.indexOf(n.processLead) != -1);
    }

    let filter7 = filter6;
    if (this.selectedFilters?.sopWpGuidelineImpacted && this.selectedFilters?.sopWpGuidelineImpacted.length > 0) {
      filter7 = null;
      filter7 = filter6.filter(
        (n: any) => this.selectedFilters.sopWpGuidelineImpacted.indexOf(n.sopWpGuidelineImpacted) != -1
      );
    }

    let filter8 = filter7;
    if (
      this.selectedFilters?.trainingDevelopedRolledOut &&
      this.selectedFilters?.trainingDevelopedRolledOut.length > 0
    ) {
      filter8 = null;
      filter8 = filter7.filter(
        (n: any) => this.selectedFilters.trainingDevelopedRolledOut.indexOf(n.trainingDevelopedAndRolledOut) != -1
      );
    }

    return filter8;
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
  }

  onResetFilters() {
    this.filterService.resetFilters();
  }

  columns: Array<any> = [
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
    this.loadRecordSub?.unsubscribe();
  }
}
