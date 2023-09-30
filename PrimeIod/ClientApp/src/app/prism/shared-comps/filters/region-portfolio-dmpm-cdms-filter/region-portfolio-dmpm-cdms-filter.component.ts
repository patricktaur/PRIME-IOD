import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
interface FiltersSelected {
  region: any;
  portfolio: any;
  dmpm: any;
  cdms: any;
}
@Component({
  selector: 'app-region-portfolio-dmpm-cdms-filter',
  templateUrl: './region-portfolio-dmpm-cdms-filter.component.html',
  styleUrls: ['./region-portfolio-dmpm-cdms-filter.component.css']
})
export class RegionPortfolioDmpmCdmsFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();
  filters: any;

  filtersSelected: FiltersSelected = {
    region: '',
    portfolio: '',
    dmpm: '',
    cdms: ''
  };

  regionFilters: string[] = [];
  portfolioFilters: any;
  cdmsFilters: any;
  dmpmsFilters: any;

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    // this.filtersSelected.portfolio = '';
    // this.filtersSelected.region = '';

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

  onFiltersChange() {
    this.filtersSelected.region = this.regionFilters;
    this.filtersSelected.portfolio = this.portfolioFilters;
    this.filtersSelected.dmpm = this.dmpmsFilters;
    this.filtersSelected.cdms = this.cdmsFilters;

    this.filterChange.emit(this.filtersSelected);
  }
}
