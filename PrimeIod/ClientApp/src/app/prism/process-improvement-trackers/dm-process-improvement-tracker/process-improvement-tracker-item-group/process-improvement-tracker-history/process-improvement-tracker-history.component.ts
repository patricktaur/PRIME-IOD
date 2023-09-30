import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { DmProcImpTrackerFiltersFilters } from '../../dm-proc-imp-tracker-filters';
import { ProcessImprovementTrackerService } from '../../process-improvement-tracker-service';

@Component({
  selector: 'app-process-improvement-tracker-history',
  templateUrl: './process-improvement-tracker-history.component.html',
  styleUrls: ['./process-improvement-tracker-history.component.css']
})
export class ProcessImprovementTrackerHistoryComponent implements OnInit, OnDestroy {
  loading = false;

  title = 'DM Process Improvement Tracker - History';

  id: number = 0;

  records: any;

  pageNumber = 1;
  pageSize = 10;

  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private processImprovementTrackerService: ProcessImprovementTrackerService
  ) {}

  ngOnInit(): void {
    // this.id = +this.actRoute.snapshot.queryParamMap.get('id');
    let id: string | null = this.actRoute.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    // this.loadRecord(this.id);
    this.loadRecords(this.id);
  }

  loadRecords(parId: number) {
    // this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
    this.loadRecordSub = this.processImprovementTrackerService.getHistoryList(parId).subscribe(
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

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  backgroundStyleOnChange = {
    'background-color': '#f2eb1d',
    // 'text-align': 'center',
    // 'vertical-align': 'middle',
    'font-weight': 'bold',
    padding: '5px',
    color: 'black',
    'border-radius': '5px'
  };

  //***Todo***
  columns: Array<any> = [
    // {
    //   header: 'Process Improvement Id',
    //   field: 'recId',
    //   align: 'right'
    // },
    {
      header: 'Updated On',
      field: 'updatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy HH:mm:ss'
    },
    {
      header: 'Due Date',
      field: 'dueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Requestor',
      field: 'requestor',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Process Improvement Status',
      field: 'processImprovementStatus',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Billable/No Billable',
      field: 'billableOrNoBillable',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Process Improvement Category',
      field: 'processImprovementCategory',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Process Improvement Sub Category',
      field: 'processImprovementSubCategory',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'scope of initiative',
      field: 'scopeOfInitiative',
      width: 50,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Process Improvement Documentation Location Including action log',
      field: 'processImprovementDocLocation',
      width: 50,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Process Lead',
      field: 'processLead',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Functional Areas Impacted',
      field: 'functionalAreasImpactedValues',
      width: 50,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Sub Team',
      field: 'subTeamValues',
      width: 50,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'SOP/WP/Guideline Impacted',
      field: 'sopWpGuidelineImpacted',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Final Process Documentation Location',
      field: 'finalProcessDocLocation',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Training Developed and rolled out',
      field: 'trainingDevelopedAndRolledOut',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
