import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
// import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { CDSValidationService } from '@app/prism/cds-trackers/cds-val-task-req-group/cds-validation.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { CdsValTaskFilterService } from '@app/prism/cds-trackers/cds-val-task-req-group/cds-val-task-filter.service';
import { CdsValPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-val-pagination-and-filters';

@Component({
  selector: 'app-cds-val-task-list',
  templateUrl: './cds-val-task-list.component.html',
  styleUrls: ['./cds-val-task-list.component.css']
})
export class CdsValTaskListComponent implements OnInit {
  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number | undefined;

  serverResponses: any = [];

  selectedFilters: CdsValPaginationAndFilters | any;

  // selectedFilters: any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'icon-number',
  //   sortBy: 'asc',
  //   sortOn: 'icon-number-task-id',
  //   completed: 'no'
  // };

  // requiredPermissions: any = {
  //   resource:
  //     'rol.admin, rol.DMPM, rol.DMPM_Manager, rol.CDMS_Lead, rol.CDMS_Manager, rol.CDS_Manager, rol.CDPL, rol.QR, rol.LL, rol.IMI_TPM, rol.IMI_PD_PM '
  // };

  loadSub: Subscription | undefined;
  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSValidationService,
    @Inject('cds-validation-server-response') private serverResponseService: ServerResponseService,
    private cdsValTaskFilterService: CdsValTaskFilterService
  ) {}

  ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    this.cdsValTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
        this.loadReport();
      }
    });
  }

  loadReport() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.cdsTrackerServices.getCdsValidationTaskList(this.selectedFilters).subscribe(
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

  onFilterChange(filters: any) {
    this.cdsValTaskFilterService.setFilters(filters);

    this.selectedFilters = filters;

    this.loadReport();
  }

  onResetFilters() {
    this.cdsValTaskFilterService.resetFilters();
  }

  onPageChange(pageOptions: any) {
    this.cdsValTaskFilterService.setFilters(this.selectedFilters);

    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Task Id',
      field: 'validationTaskReqDevReqTaskId', //Displays Parent TableId.
      actionType: 'link',
      linkField: 'validationTaskReqRecId', //Accesses RecId
      linkPath: 'item-group' //working
    },

    {
      header: 'Icon Number',
      field: 'studyIconNumber'
      // actionType: 'link',
      // linkField: 'studyId',
      // linkPath: '/study'
    },

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
      header: 'CDMS',
      field: 'cdms',
      width: 100
    },

    {
      header: 'Development Task Category',
      field: 'validationTaskReqDevCategory',
      width: 50
    },
    {
      header: 'Development Task Detail',
      field: 'validationTaskReqDevDetail',
      width: 50
    },
    {
      header: 'Is this an update to an existing Program',
      field: 'validationTaskReqIsThisAProgrammingPPC'
    },

    {
      header: 'Is this output to be uploaded to DRT',
      field: 'developmentTaskRequestIsThisaProgrammingPpc',
      width: 50
    },
    {
      header: 'No. of Units',
      field: 'validationTaskReqNoOfUnits'
    },
    {
      header: 'Development Status',
      field: 'validationTaskReqDevStatus'
    },
    {
      header: 'Validation Status',
      field: 'validationTaskReqValidationStatus'
    },
    {
      header: 'Current Validation Round',
      field: 'validationTaskReqCurrentValidationRound'
    },
    {
      header: 'Validation Task Involved',
      field: 'validationTaskReqValidationTaskInvolved'
    },

    {
      header: 'Validation Start Date',
      field: 'validationTaskReqValidationStartDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Validation End Date',
      field: 'validationTaskReqvalidationEndDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Final Validation round',
      field: 'validationTaskReqFinalValidatoinRound'
    },
    {
      header: 'Total Prog Issues',
      field: 'validationTaskReqTotalProgIssues'
    },
    {
      header: 'Total Spec Issues',
      field: 'validationTaskReqTotalSpecIssues'
    },
    {
      header: 'Total Val Issues',
      field: 'validationTaskReqTotalValIssues'
    },
    {
      header: 'Link to Val Documents',
      field: 'validationTaskReqLinkToValDoc',
      width: 50
    },
    {
      header: 'Validation POC',
      field: 'validationTaskReqValidatonPOC'
    },
    {
      header: 'Validation Members',
      field: 'validationTaskReqValidationMembers'
    },
    {
      header: 'Validation Due Date',
      field: 'validationTaskReqDevDueDat',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Programming Due Date',
      field: 'developmentTaskRequestDueDate', //field not found
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },

    {
      header: 'Requestor',
      field: 'validationTaskReqRequestor',
      width: 50
    },

    {
      header: 'Programmer Assigned',
      field: 'validationTaskReqProgrammerAssignedToName',
      width: 50
    },

    {
      header: 'Last Saved By',
      field: 'validationTaskReqLastSavedBy', //view changes required to get name
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'validationTaskReqLastSavedOn',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
