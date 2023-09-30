import { Component, Directive, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { IFilter } from '@app/prism/reports/filters/ifilter';
import { IFilter } from '@app/prism/reports/filter-shell/ifilter';
import { FormControl } from '@angular/forms';
import { FilterOptionsService } from '@app/prism/shared-comps/filter-options.service';

@Directive()
export abstract class FilterBaseComponent implements IFilter {
  @Input() inputRecords: any;
  @Output() outputRecords = new EventEmitter<any>();
  @Output() searchTerm = new EventEmitter<any>();

  @Output() searchTextChange = new EventEmitter<any>();

  filterForm = new FormControl('');

  filterOptions: any;

  constructor(protected filterOptionService: FilterOptionsService) {}

  onFilterChange(filteredRecords: any) {
    this.outputRecords.emit(filteredRecords);
  }

  onSearchTextChange(searchText: Event | string) {
    this.searchTerm.emit(searchText);
  }

  loadFilters() {
    this.filterOptionService.loadFilters();
  }
}
