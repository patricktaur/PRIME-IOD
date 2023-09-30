import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-celgene-deliverables-filter',
  templateUrl: './celgene-deliverables-filter.component.html',
  styleUrls: ['./celgene-deliverables-filter.component.css']
})
export class CelgeneDeliverablesFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();

  filters: any;
  DeliveryTypeFilters: any;
  OutComeFilters: any;

  filteredOneStudies: any;

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.filteredOneStudies = this.records;
    this.loadFilters();
    // this.filterForm.valueChanges.subscribe(val => {
    //   this.onSearchTextChange();
    // });
  }

  loadFilters() {
    this.sharedCompsService.getCelgeneDeliverablesReportFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }
  //

  onFilterOneChange(filteredRecords: any) {
    this.filteredOneStudies = filteredRecords;
    this.onFiltersChange();
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }

  onSearchTextChange(searchText: string) {
    // this.searchTerm = searchText;
  }

  get filterRecords() {
    let filter1 = this.filteredOneStudies;
    if (this.DeliveryTypeFilters && this.DeliveryTypeFilters.length > 0) {
      filter1 = null;
      filter1 = this.filteredOneStudies.filter(
        (n: any) => this.DeliveryTypeFilters.indexOf(n.celgeneDeliverableType) !== -1
      );
    }
    let filter2 = filter1;
    if (this.OutComeFilters && this.OutComeFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.OutComeFilters.indexOf(n.celgeneOutcome) !== -1);
    }

    return filter2;
  }
}
