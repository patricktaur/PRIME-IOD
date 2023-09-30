import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

// import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { CDSCodingService } from '@app/prism/cds-trackers/cds-coding-task-req-group/cds-coding.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { CdsCodingTaskFilterService } from '@app/prism/cds-trackers/cds-coding-task-req-group/cds-coding-task-filter.service';
import { CdsCodingPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-coding-pagination-and-filters';
@Component({
  selector: 'app-cds-coding-task-req-group-list',
  templateUrl: './cds-coding-task-req-group-list.component.html',
  styleUrls: ['./cds-coding-task-req-group-list.component.css']
})
export class CdsCodingTaskReqGroupListComponent implements OnInit, OnDestroy {
  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number = 0;

  serverResponses: any = [];

  selectedFilters: CdsCodingPaginationAndFilters | any;

  // selectedFilters: any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'icon-number',
  //   sortBy: 'asc',
  //   sortOn: 'icon-number-task-id',
  //   completed: 'no'
  // };
  requiredPermissions: any = {
    resource:
      'rol.admin, rol.DMPM, rol.DMPM_Manager, rol.CDMS_Lead, rol.CDMS_Manager, rol.CDS_Manager, rol.CDPL, rol.QR, rol.LL, rol.IMI_TPM, rol.IMI_PD_PM '
  };

  loadSub: Subscription | undefined;

  initialized: boolean = false;

  constructor(
    public router: Router,
    public actRoute: ActivatedRoute,

    private cdsTrackerServices: CDSCodingService, // public studyEditService: StudyEditAService
    @Inject('cds-coding-server-response') private serverResponseService: ServerResponseService,
    private cdsCodingTaskFilterService: CdsCodingTaskFilterService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private cdscodingtaskreqgroupEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    this.cdsCodingTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
        if (this.initialized == false) {
          this.selectedFilters.pageNumber = 1;
          this.initialized = true;
        }
        this.loadReport();
      }
    });
  }

  //***Todo***
  loadReport() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.cdsTrackerServices.getCdsCodingTaskList(this.selectedFilters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res.records;
          this.recordCount = res.recordCount;
          this.filteredRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // onFilterChange(filters: PaginationAndStudyFilters) {
  //   this.selectedFilters = filters;

  //   this.loadReport();
  // }

  add() {
    ///study/cds/devp-request/item-group
    //relativeTo: this.actRoute.parent,
    this.router.navigate(['new'], {
      relativeTo: this.actRoute.parent,
      state: { studyId: 0, id: 0 }
    });
  }

  onFilterChange(filters: any) {
    this.cdsCodingTaskFilterService.setFilters(filters);

    this.selectedFilters = filters;

    this.loadReport();
  }

  onResetFilters() {
    this.cdsCodingTaskFilterService.resetFilters();
  }

  onPageChange(pageOptions: any) {
    this.cdsCodingTaskFilterService.setFilters(this.selectedFilters);

    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Task Id',
      field: 'codingTaskRequestRecId',
      actionType: 'link',
      linkField: 'codingTaskRequestRecId',
      linkPath: 'item-group' //working
    },
    {
      header: 'Icon Number',
      field: 'studyIconNumber'
      // actionType: 'link',
      // linkField: 'studyId',
      // linkPath: '/study'
    },

    // {
    //   header: 'Status',
    //   field: 'statusText'
    // },

    {
      header: 'Region',
      field: 'region',
      width: 100
    },
    {
      header: 'Sponsor',
      field: 'sponsor',
      width: 100
    },

    {
      header: 'Portfolio',
      field: 'portfolio',
      width: 100
    },

    {
      header: 'Study Name',
      field: 'studyName',
      width: 100
    },
    {
      header: 'Coding Category',
      field: 'codingTaskRequestCodingTaskCategory',
      width: 50
    },
    // {
    //   header: 'Development Status',
    //   field: 'developmentTaskRequestDevelopmentStatus',
    //   width: 50
    // },
    {
      header: 'Coding Detail',
      field: 'codingTaskRequestCodingTaskDetails',
      width: 50
    },
    // {
    //   header: 'Is this output to be uploaded to DRT',
    //   field: 'developmentTaskRequestIsThisaProgrammingPpc',
    //   width: 50
    // },
    {
      header: 'Created Date',
      field: 'codingTaskRequestCreatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Due Date',
      field: 'codingTaskRequestDueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Recurring Frequency',
      field: 'codingTaskRequestRecurringFrequency'
    },
    {
      header: 'Completed Date',
      field: 'codingTaskRequestCompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Completed By',
      field: 'codingTaskRequestCompletedBy',
      width: 50
    },

    // {
    //   header: 'No. of Units',
    //   field: 'developmentTaskRequestNoOfUnits'
    // },

    // {
    //   header: 'Is this an update to an existing Program',
    //   field: 'developmentTaskRequestIsThisaProgrammingPpc'
    // },
    // {
    //   header: 'Programmer Assigned',
    //   field: 'developmentTaskRequestCDSAssignedTo',
    //   width: 50
    // },
    {
      header: 'Primary Coding Specialist	',
      field: 'codingTaskRequestCodingSpecialistAssigned',
      width: 50
    },
    {
      header: 'Secondary Coding Specialist',
      field: 'codingTaskRequestSecondaryCodingSpecialistAssignedTo',
      width: 50
    },
    // {
    //   header: 'Priority',
    //   field: 'developmentTaskRequestPriority',
    //   width: 50
    // },
    {
      header: 'Requestor',
      field: 'codingTaskRequestRequestor',
      width: 50
    },
    {
      header: 'Version',
      field: 'codingTaskRequestVersionNumber',
      width: 50
    },
    // "codingTaskRequestLastSavedBy": "Brandon Taylor", "codingTaskRequestUpdatedOn": "11/1/2016 3:59:18 PM"
    {
      header: 'Last Saved By',
      field: 'codingTaskRequestLastSavedBy',
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'codingTaskRequestUpdatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
