import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { CdsDevTaskFilterService } from '@app/prism/cds-trackers/cds-dev-task-req-group/cds-dev-task-filter.service';
@Component({
  selector: 'app-cds-dev-req-base-list',
  templateUrl: './cds-dev-req-base-list.component.html',
  styleUrls: ['./cds-dev-req-base-list.component.css']
})
export class CdsDevReqBaseListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() filters: any;

  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number = 0;

  serverResponses: any = [];

  loadSub: Subscription | undefined;
  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSTrackersService,
    @Inject('cds-development-server-response') private serverResponseService: ServerResponseService,
    private cdsDevTaskFilterService: CdsDevTaskFilterService
  ) {}

  ngOnInit(): void {
    this.serverResponses = this.serverResponseService.serverResponses;

    this.cdsDevTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.filters = filters; //{... filters};
      }
      this.loadReport(this.filters);
    });
    // this.loadReport();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadReport(changes['filters'].currentValue);
  }

  loadReport(filters: any) {
    this.isLoading = true;
    this.records = null;
    this.loadSub = this.cdsTrackerServices.getCdsDevelopmentTaskList(filters).subscribe(
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

  get pageNumber() {
    return this.filters?.pageNumber ?? 2;
  }

  get pageSize() {
    return this.filters?.pageSize ?? 10;
  }

  add() {
    ///study/cds/devp-request/item-group
    //relativeTo: this.actRoute.parent,
    this.router.navigate(['new'], {
      relativeTo: this.actRoute.parent,
      state: { studyId: 0, id: 0 }
    });
  }

  onPageChange(pageOptions: any) {
    this.filters.pageNumber = pageOptions.page;
    this.filters.pageSize = pageOptions.pageSize;
    this.cdsDevTaskFilterService.setFilters(this.filters);
    this.loadReport(this.filters);
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Task Id',
      field: 'developmentTaskRequestRecId',
      actionType: 'link',
      linkField: 'developmentTaskRequestRecId',
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
      width: 100,
      hide: true
    },
    {
      header: 'Sponsor',
      field: 'sponsor',
      width: 100
    },

    {
      header: 'Portfolio',
      field: 'portfolio',
      width: 100,
      hide: true
    },

    {
      header: 'Study Name',
      field: 'studyName',
      width: 100
    },
    {
      header: 'Development Category',
      field: 'developmentTaskRequestDevelopmentCategory',
      width: 50
    },
    {
      header: 'Development Sub Category',
      field: 'developmentTaskRequestDevelopmentSubCategory',
      width: 50
    },
    {
      header: 'Development Status',
      field: 'developmentTaskRequestDevelopmentStatus',
      width: 50
    },
    {
      header: 'Development Detail',
      field: 'developmentTaskRequestDevelopmentDetails',
      width: 50
    },
    {
      header: 'Is this output to be uploaded to DRT',
      field: 'developmentTaskRequestIsThisaProgrammingPpc',
      width: 50
    },
    {
      header: 'Created Date',
      field: 'developmentTaskRequestCreatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Due Date',
      field: 'developmentTaskRequestDueDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Completed Date',
      field: 'developmentTaskRequestCompletedDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Completed By',
      field: 'developmentTaskRequestCompletedBy',
      width: 50
    },

    {
      header: 'No. of Units',
      field: 'developmentTaskRequestNoOfUnits',
      hide: true
    },

    {
      header: 'Is this an update to an existing Program',
      field: 'developmentTaskRequestIsThisaProgrammingPpc'
    },
    {
      header: 'Programmer Assigned',
      field: 'developmentTaskRequestCDSAssignedTo',
      width: 50
    },
    {
      header: 'Validation Programmer	',
      field: 'developmentTaskRequestValidationProgrammer',
      width: 50,
      hide: true
    },
    {
      header: 'Programming Lead',
      field: 'developmentTaskRequestClinicalDataDeliveryLead',
      width: 50
    },
    {
      header: 'Priority',
      field: 'developmentTaskRequestPriority',
      width: 50,
      hide: true
    },
    {
      header: 'Requestor',
      field: 'developmentTaskRequestRequestor',
      width: 50
    },
    {
      header: 'Version',
      field: 'developmentTaskRequestVersionNumber',
      width: 50,
      hide: true
    },

    {
      header: 'Last Saved By',
      field: 'developmentTaskRequestLastSavedBy',
      width: 50
    },
    {
      header: 'Last Saved On',
      field: 'developmentTaskRequestUpdatedOn',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
