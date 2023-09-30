import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { StudyCdsDevFilterService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-filter.service';
import { CdsDevTaskFilterService } from '@app/prism/cds-trackers/cds-dev-task-req-group/cds-dev-task-filter.service';
import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { Json2CsvDownloadService } from '@app/shared/services/json-2-csv-download.service';
// import { stat } from 'fs';

@Component({
  selector: 'app-cds-dev-req-group-list',
  templateUrl: './cds-dev-req-group-list.component.html',
  styleUrls: ['./cds-dev-req-group-list.component.css']
})
export class CdsDevTaskReqGroupListComponent implements OnInit {
  // selectedFilters: any = {
  //   pageNumber: 1,
  //   pageSize: 10,
  //   searchOn: 'icon-number',
  //   sortBy: 'asc',
  //   sortOn: 'icon-number-task-id',
  //   completed: 'no'
  // };
  currentUserId: string | undefined;
  hasAdminRole: boolean = false;
  hasCdsManagerRole: boolean = false;
  currentUserRoleIsAdminOrCdsManager: boolean = false;

  selectedFilters: CdsDevpPaginationAndFilters | any;

  requiredPermissions: any = {
    resource:
      'rol.admin, rol.DMPM, rol.DMPM_Manager, rol.CDMS_Lead, rol.CDMS_Manager, rol.CDS_Manager, rol.CDPL, rol.QR, rol.LL, rol.IMI_TPM, rol.IMI_PD_PM '
  };

  initialized: boolean = false;

  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private actRoute: ActivatedRoute,
    private cdsDevTaskFilterService: CdsDevTaskFilterService
  ) {}

  ngOnInit(): void {
    this.cdsDevTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
      }

      if (this.initialized == false) {
        //workaround: ngbPagination displays page:1 even when page No is not 1
        // to sync with ngbPagination, the selectedFilters received from cdsDevTaskFilterService is set to 1
        // so that the records related to page 1 are displayed.
        this.selectedFilters.pageNumber = 1;
        this.selectedFilters.completed = 'no';
        this.actRoute.queryParams.subscribe((params: any) => {
          const status = params.status;
          if (status) {
            this.selectedFilters.completed = '';
            this.selectedFilters.status = [];
            this.selectedFilters.status.push(status);
          }
          const tag = params.tag;
          if (tag) {
            this.selectedFilters.type = tag;
          }
        });

        this.initialized = true;
      }
    });

    this.currentUserId = this.credentialsService.currentUser.id;
    this.hasAdminRole = this.credentialsService.userHasRolePermission(UserRoles.Admin);
    this.hasCdsManagerRole = this.credentialsService.userHasRolePermission(UserRoles.CDS_Manager);
    this.currentUserRoleIsAdminOrCdsManager = this.hasAdminRole || this.hasCdsManagerRole ? true : false;
  }

  onItemClicked(item: any) {
    this.selectedFilters = this.cdsDevTaskFilterService.getDefaultFilters();
    this.selectedFilters.status.push(item.selectedItem);
    this.selectedFilters.type = item.tag;
    this.cdsDevTaskFilterService.setFilters(this.selectedFilters);
  }

  add() {
    this.router.navigate(['new'], {
      relativeTo: this.actRoute.parent,
      state: { studyId: 0, id: 0 }
    });
  }

  onFilterChange(filters: any) {
    this.cdsDevTaskFilterService.setFilters(filters);
    // this.selectedFilters = filters;
    // this.selectedFilters = { ...this.selectedFilters };
  }

  onResetFilters() {
    this.cdsDevTaskFilterService.resetFilters();
  }
  // pageOptionsChanged(pageOptions: any) {
  //   this.cdsDevTaskFilterService.setFilters(this.selectedFilters);
  //   this.selectedFilters.pageNumber = pageOptions?.pageNumber;
  //   this.selectedFilters.pageSize = pageOptions?.pageSize;
  // }
}
