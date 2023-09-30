import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-study-dbl-summary-filter',
  templateUrl: './study-dbl-summary-filter.component.html',
  styleUrls: ['./study-dbl-summary-filter.component.css']
})
export class StudyDblSummaryFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();

  @Output() searchTextChange = new EventEmitter<any>();

  filters: any;
  filteredOneStudies: any;

  edcPaperFilters: any;
  typeOfDBLFilters: any;
  passOrFailFilters: any;

  constructor() {}

  ngOnInit(): void {
    this.filteredOneStudies = this.records;
  }

  onFilterOneChange(filteredRecords: any) {
    this.filteredOneStudies = filteredRecords;
    this.onFiltersChange();
  }

  onFilterTwoChange() {
    this.onFiltersChange();
  }

  onSearchTextChange(searchText: string) {
    // this.searchTerm = searchText;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }

  get filterRecords() {
    let filter1 = this.filteredOneStudies;
    if (this.edcPaperFilters && this.edcPaperFilters.length > 0) {
      filter1 = null;
      filter1 = this.filteredOneStudies.filter((n: any) => this.edcPaperFilters.indexOf(n.eDCYorN) !== -1);
    }
    let filter2 = filter1;
    if (this.typeOfDBLFilters && this.typeOfDBLFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.typeOfDBLFilters.indexOf(n.mainOrFollowup) !== -1);
    }
    let filter3 = filter2;
    if (this.passOrFailFilters && this.passOrFailFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.passOrFailFilters.indexOf(n.passOrFail) !== -1);
    }

    //mainOrFollowup

    return filter3;

    // return this.filteredOneStudies;
  }
}
