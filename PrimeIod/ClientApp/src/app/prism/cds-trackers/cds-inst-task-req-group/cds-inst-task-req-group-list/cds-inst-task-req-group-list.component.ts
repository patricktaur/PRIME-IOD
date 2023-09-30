import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

// import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { CDSInstructionService } from '@app/prism/cds-trackers/cds-inst-task-req-group/cds-instruction.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { CdsInstTaskFilterService } from '@app/prism/cds-trackers/cds-inst-task-req-group/cds-inst-task-filter.service';
import { CdsInstrPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-instr-pagination-and-filters';

@Component({
  selector: 'app-cds-inst-task-req-group-list',
  templateUrl: './cds-inst-task-req-group-list.component.html',
  styleUrls: ['./cds-inst-task-req-group-list.component.css']
})
export class CdsInstTaskReqGroupListComponent implements OnInit {
  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number = 0;

  serverResponses: any = [];

  selectedFilters: CdsInstrPaginationAndFilters | any;

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

  initialized: boolean = false;
  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSInstructionService,
    @Inject('cds-instruction-server-response') private serverResponseService: ServerResponseService,
    private cdsInstTaskFilterService: CdsInstTaskFilterService
  ) {}

  ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;
    this.cdsInstTaskFilterService.filters.subscribe((filters: any) => {
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

  loadReport() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.cdsTrackerServices.getCdsInstructionTaskList(this.selectedFilters).subscribe(
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
    this.cdsInstTaskFilterService.setFilters(filters);

    this.selectedFilters = filters;

    this.loadReport();
  }

  onResetFilters() {
    this.cdsInstTaskFilterService.resetFilters();
  }

  onPageChange(pageOptions: any) {
    this.cdsInstTaskFilterService.setFilters(this.selectedFilters);

    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Task Id',
      field: 'instructionTaskRequestRecId',
      actionType: 'link',
      linkField: 'instructionTaskRequestRecId',
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
      header: 'Status',
      field: 'statusText'
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
      header: 'Program Detail',
      field: 'instructionTaskRequestProgramName', //verify
      width: 50
    },
    {
      header: 'Instruction Programming Task Category',
      field: 'instructionTaskRequestProgrammingTask', //verify
      width: 50
    },
    {
      header: 'On Scheduler',
      field: 'instructionTaskRequestOnScheduler',
      width: 50
    },

    {
      header: 'Created Date',
      field: 'instructionTaskRequestCreatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },

    // {
    //   header: 'Version',
    //   field: 'developmentTaskRequestVersionNumber',
    //   width: 50
    // },
    // "instructionTaskRequestCDP": "Kathleen Reed", "instructionTaskRequestCDPL": "Ch
    // {
    //   header: 'CDP',
    //   field: 'instructionTaskRequestCDP',
    //   width: 50
    // },
    {
      header: 'CDPL',
      field: 'instructionTaskRequestCDPL',
      width: 50
    },
    {
      header: 'Last Saved By',
      field: 'XX',
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'XX',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
