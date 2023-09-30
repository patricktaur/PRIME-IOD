import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
@Component({
  selector: 'app-region-portfolio-director-cdms-dmpm-filter',
  templateUrl: './region-portfolio-director-cdms-dmpm-filter.component.html',
  styleUrls: ['./region-portfolio-director-cdms-dmpm-filter.component.css']
})
export class RegionPortfolioDirectorCdmsDmpmFilterComponent implements OnInit {
  public isCollapsed = false;

  filters: any;
  regionFilters: string[] = [];
  portfolioFilters: any;
  cdmsFilters: any;
  dmpmsFilters: any;
  dmpmManagerFilters: any;

  statusFilters: any;
  sponsorFilters: any;

  specialProjectFilters: any;

  frequencyFilters: any;

  studyTypeFilters: any;

  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();
  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    // this.isLoading = true;
    // this.filterValues.pageNo = this.pageNumber;
    // this.filterValues.pageSize = this.pageSize;

    this.sharedCompsService.getDMFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.totalItems = res.recordCount;
          this.filters = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  get filterRecords() {
    let filter1 = this.records;

    if (this.regionFilters && this.regionFilters.length > 0) {
      filter1 = null;
      filter1 = this.records.filter((n: any) => this.regionFilters.indexOf(n.region) !== -1);
    }

    let filter2 = filter1;
    if (this.portfolioFilters && this.portfolioFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.portfolioFilters.indexOf(n.portfolio) !== -1);
    }

    let filter3 = filter2;
    if (this.dmpmManagerFilters && this.dmpmManagerFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.dmpmManagerFilters.some((v: any) => n.currentDmpmManager?.includes(v)));
    }

    let filter4 = filter3;
    if (this.cdmsFilters && this.cdmsFilters.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.cdmsFilters.indexOf(n.cdms) !== -1);
    }

    // Role
    let filter5 = filter4;
    if (this.dmpmsFilters && this.dmpmsFilters.length > 0) {
      filter5 = null;
      filter5 = filter4.filter((n: any) => this.dmpmsFilters.some((v: any) => n.currentDmpm?.includes(v)));
    }

    return filter5;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }
}
