import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

// import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';

import { CDSOutputService } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-output.service';
import { CdsOutputTaskFilterService } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-output-task-filter.service';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';

@Component({
  selector: 'app-cds-output-task-req-group-list',
  templateUrl: './cds-output-task-req-group-list.component.html',
  styleUrls: ['./cds-output-task-req-group-list.component.css']
})
export class CDSOutputTaskGroupListComponent implements OnInit {
  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number | undefined;

  batchActionMode: boolean = false;
  selectedFilters: CdsOutputPaginationAndFilters | any;

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

  initialized: boolean = false;
  // loadSub: Subscription;
  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSOutputService,
    private cdsOutputTaskFilterService: CdsOutputTaskFilterService
  ) {}

  ngOnInit(): void {
    this.cdsOutputTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
        if (this.initialized == false) {
          this.selectedFilters.pageNumber = 1;

          this.actRoute.queryParams.subscribe((params: any) => {
            const item = params.dueType;
            if (item) {
              this.selectedFilters.dueType = item;
            }
          });
          this.initialized = true;
        }
      }
    });
  }

  onItemClicked(item: any) {
    const dueType = item.tag + '-' + item.selectedItem.keyValue;

    // this.selectedFilters.status = [];
    // this.selectedFilters.dueType = dueType; // .push(dueType);

    // this.cdsOutputTaskFilterService.setFilters(this.selectedFilters);
    // this.onFilterChange(this.selectedFilters);

    this.selectedFilters = this.cdsOutputTaskFilterService.getDefaultFilters();
    this.selectedFilters.dueType = dueType;
    this.cdsOutputTaskFilterService.setFilters(this.selectedFilters);
  }

  onResetFilters() {
    this.cdsOutputTaskFilterService.resetFilters();
  }

  batchActionModeChanged(value: any) {
    this.batchActionMode = value;
  }

  add() {
    ///study/cds/devp-request/item-group
    //relativeTo: this.actRoute.parent,
    this.router.navigate(['new'], {
      relativeTo: this.actRoute.parent,
      state: { studyId: 0, id: 0 }
    });
  }

  onFilterChange(filters: any) {
    this.cdsOutputTaskFilterService.setFilters(filters);
    this.selectedFilters = filters;
    this.selectedFilters = { ...this.selectedFilters };
    // this.loadReport();
  }

  // onPageChange(pageOptions: any) {
  //   this.selectedFilters.pageNumber = pageOptions.page;
  //   this.selectedFilters.pageSize = pageOptions.pageSize;
  //   this.loadReport();
  // }

  // columns: Array<UIGridColumn> = [
  //   {
  //     header: 'Task Id',
  //     field: 'outputTaskRequestRecId',
  //     actionType: 'link',
  //     linkField: 'outputTaskRequestRecId',
  //     linkPath: 'item-group' //working
  //   },
  //   {
  //     header: 'Icon Number',
  //     field: 'studyIconNumber'
  //   },

  //   {
  //     header: 'Region',
  //     field: 'region'
  //   },
  //   {
  //     header: 'Portfolio',
  //     field: 'portfolio',
  //     width: 100
  //   },

  //   {
  //     header: 'Sponsor',
  //     field: 'sponsor',
  //     width: 100
  //   },

  //   {
  //     header: 'Study Name',
  //     field: 'studyName',
  //     width: 100
  //   },
  //   {
  //     header: 'Output Category',
  //     field: 'outputTaskRequestOutputTaskCategory',
  //     width: 50
  //   },

  //   {
  //     header: 'Output Detail',
  //     field: 'outputTaskRequestOutputTaskDetail',
  //     width: 50
  //   },

  //   {
  //     header: 'Created Date',
  //     field: 'outputTaskRequestCreatedOn',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   },
  //   {
  //     header: 'Due Date',
  //     field: 'outputTaskRequestDueDate',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   },
  //   {
  //     header: 'Recurring Frequency',
  //     field: 'outputTaskRequestRecurringFrequency',
  //     width: 50
  //   },
  //   {
  //     header: 'Completed Date',
  //     field: 'outputTaskRequestCompletedDate',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   },

  //   {
  //     header: 'Completed By',
  //     field: 'outputTaskRequestCompletedBy',
  //     width: 50
  //   },

  //   {
  //     header: 'Programming Lead',
  //     field: 'outputTaskRequestClinicalDataDeliveryLead',
  //     width: 50
  //   },
  //   {
  //     header: 'Programmer Assigned',
  //     field: 'outputTaskRequestCDSAssignedTo',
  //     width: 50
  //   },
  //   {
  //     header: 'Requestor',
  //     field: 'outputTaskRequestRequestor',
  //     width: 50
  //   },
  //   {
  //     header: 'On Scheduler',
  //     field: 'outputTaskRequestOnScheduler',
  //     width: 50
  //   },
  //   {
  //     header: 'Version',
  //     field: 'outputTaskRequestVersionNumber',
  //     width: 50
  //   },

  //   {
  //     header: 'Last Saved By',
  //     field: 'outputTaskRequestLastSavedBy',
  //     width: 50
  //   },
  //   {
  //     header: 'Last Saved On',
  //     field: 'outputTaskRequestUpdatedOn',
  //     type: 'date',
  //     format: 'dd-MMM-yyyy',
  //     align: 'center'
  //   }
  // ];

  ngOnDestroy(): void {
    // this.loadSub.unsubscribe();
  }
}
