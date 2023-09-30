import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

// import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { CDSDelService } from '@app/prism/cds-trackers/cds-del-task-req-group/cds-del.service';
import { CdsDelTaskFilterService } from '@app/prism/cds-trackers/cds-del-task-req-group/cds-del-task-filter.service';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';

@Component({
  selector: 'app-cds-del-task-req-group-list',
  templateUrl: './cds-del-task-req-group-list.component.html',
  styleUrls: ['./cds-del-task-req-group-list.component.css']
})
export class CdsDelTaskReqGroupListComponent implements OnInit {
  isLoading = false;
  records: any = [];
  filteredRecords: any;
  recordCount: number | undefined;

  selectedFilters: CdsOutputPaginationAndFilters | any;

  loadSub: Subscription | undefined;

  initialized: boolean = false;
  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSDelService,
    private cdsDelTaskFilterService: CdsDelTaskFilterService
  ) {}

  ngOnInit(): void {
    this.cdsDelTaskFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
      }
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
    });
  }

  onItemClicked(item: any) {
    const dueType = item.tag + '-' + item.selectedItem.keyValue;

    this.selectedFilters = this.cdsDelTaskFilterService.getDefaultFilters();
    this.selectedFilters.dueType = dueType; // .push(dueType);

    this.cdsDelTaskFilterService.setFilters(this.selectedFilters);
  }

  onResetFilters() {
    this.cdsDelTaskFilterService.resetFilters();
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
    this.cdsDelTaskFilterService.setFilters(filters);

    this.selectedFilters = filters;
    this.selectedFilters = { ...this.selectedFilters };

    // this.loadReport();
  }

  ngOnDestroy(): void {
    // this.loadSub.unsubscribe();
  }
}
