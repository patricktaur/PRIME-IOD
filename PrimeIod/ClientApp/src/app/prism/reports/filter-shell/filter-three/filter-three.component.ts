import { Component, OnInit } from '@angular/core';
// import { FilterBaseComponent } from '@app/prism/reports/filters/filter-base/filter-base.component';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';

@Component({
  selector: 'app-filter-three',
  templateUrl: './filter-three.component.html',
  styleUrls: ['./filter-three.component.css']
})
export class FilterThreeComponent extends FilterBaseComponent implements OnInit {
  ngOnInit(): void {
    this.loadFilters();
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
