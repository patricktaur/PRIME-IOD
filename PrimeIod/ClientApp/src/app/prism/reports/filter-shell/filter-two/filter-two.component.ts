import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FilterBaseComponent } from '@app/prism/reports/filters/filter-base/filter-base.component';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-filter-two',
  templateUrl: './filter-two.component.html',
  styleUrls: ['./filter-two.component.css']
})
export class FilterTwoComponent extends FilterBaseComponent implements OnInit {
  // constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  regionFilteredRecords: any;
  regionFilteredEvent(filteredRecords: any) {
    this.regionFilteredRecords = filteredRecords;
  }

  sponsorFilteredRecords: any;
  sponsorFilteredEvent(filteredRecords: any) {
    this.sponsorFilteredRecords = filteredRecords;
  }

  regionComponentRecords: any;
  regionComponentEvent(filteredRecords: any) {
    this.regionComponentRecords = filteredRecords;
    console.log('regionComponentRecords:' + this.regionComponentRecords?.length);
  }

  sponsorComponentRecords: any;
  sponsorComponentEvent(filteredRecords: any) {
    this.sponsorComponentRecords = filteredRecords;
    console.log('sponsorComponentRecords:' + this.sponsorComponentRecords?.length);
  }
}
