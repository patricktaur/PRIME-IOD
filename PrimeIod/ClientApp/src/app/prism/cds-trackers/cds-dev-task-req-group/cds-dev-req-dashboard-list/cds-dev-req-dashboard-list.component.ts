import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CdsPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-pagination-and-filters';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

import { CdsDevTaskFilterService } from '@app/prism/cds-trackers/cds-dev-task-req-group/cds-dev-task-filter.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-cds-dev-req-dashboard-list',
  templateUrl: './cds-dev-req-dashboard-list.component.html',
  styleUrls: ['./cds-dev-req-dashboard-list.component.css']
})
export class CdsDevReqDashboardListComponent implements OnInit {
  status: any;
  title: string | undefined;

  filters: CdsDevpPaginationAndFilters | any;
  currentUserId!: number;
  // filters: CdsPaginationAndFilters = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   sortOn: 'task-id',
  //   sortBy: 'asc',
  //   textSearchField: '',
  //   textSearch: '',
  //   region: [],
  //   portfolio: [],
  //   cdms: [],
  //   dmpm: [],
  //   requestor: [],
  //   programmerAssigned: [],
  //   programmerLead: [],
  //   taskCategory: [],
  //   dueDateFrom: null,
  //   dueDateTo: null,
  //   status: [],
  //   completed: 'no',
  //   dueType: ''
  // };

  hasAdminRole: boolean = false;
  hasCdsManagerRole: boolean = false;
  currentUserRoleIsAdminOrCdsManager: boolean = false;

  loadSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private credentialsService: CredentialsService,
    private tblParamService: TblParamService,
    private cdsDevTaskFilterService: CdsDevTaskFilterService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const item = params.status;
      //.keyValue

      // this.filters.status.push(item);
      this.status = item;
      this.getTitle(this.status);
    });

    this.cdsDevTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.filters = filters; //{... filters};
      }
    });

    if(this.credentialsService.currentUser.id) {
      this.currentUserId = +this.credentialsService.currentUser.id;
    }

    this.hasAdminRole = this.credentialsService.userHasRolePermission(UserRoles.Admin);
    this.hasCdsManagerRole = this.credentialsService.userHasRolePermission(UserRoles.CDS_Manager);
    this.currentUserRoleIsAdminOrCdsManager = this.hasAdminRole || this.hasCdsManagerRole ? true : false;
  }

  onItemClicked(status: any) {
    this.filters.status = [];
    this.filters.status.push(status);
    this.status = status;
    this.filters = { ...this.filters };
    this.getTitle(this.status);
    this.cdsDevTaskFilterService.setFilters(this.filters);
  }

  //Refactor - avoid a separate call to db to get title?
  getTitle(id: number): void {
    this.loadSub = this.tblParamService.getTblParam(id).subscribe((res: any) => {
      this.title = res?.description;
    });
  }
}
