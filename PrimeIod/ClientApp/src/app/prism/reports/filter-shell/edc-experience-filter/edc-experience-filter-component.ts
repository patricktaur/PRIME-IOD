import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-filter-four',
  templateUrl: './edc-experience-filter-component.html',
  styleUrls: ['./edc-experience-filter-component.css']
})
export class EDCExperienceFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();
  filters: any;
  regionFilters: string[] = [];
  phaseFilters: any;
  therapeuticAreaFilters: any;
  cdmsFilters: any;

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
      filter1 = this.records.filter((n: any) => this.regionFilters.indexOf(n.region) != -1);
    }

    let filter2 = filter1;
    if (this.phaseFilters && this.phaseFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.phaseFilters.indexOf(n.protocolPhase) != -1);
    }

    let filter3 = filter2;
    if (this.therapeuticAreaFilters && this.therapeuticAreaFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.therapeuticAreaFilters.indexOf(n.therapeuticArea) != -1);
    }

    let filter4 = filter3;
    if (this.cdmsFilters && this.cdmsFilters.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.cdmsFilters.indexOf(n.cdms) != -1);
    }

    return filter4;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }
}
