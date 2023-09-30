import { Component, Directive, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { IFilter } from '@app/prism/reports/filters/ifilter';
import { IFilterTypeA } from '@app/prism/reports/filter-shell/ifilter-type-a';
import { FormControl } from '@angular/forms';
import { FilterOptionsService } from '@app/prism/shared-comps/filter-options.service';

@Directive()
export abstract class FilterBaseTypeAComponent implements IFilterTypeA {
  // @Input() inputRecords: string;
  // @Output() outputRecords = new EventEmitter<any>();
  // @Output() searchTerm = new EventEmitter<any>();

  // @Output() searchTextChange = new EventEmitter<any>();

  // filterForm = new FormControl('');

  // filterOptions: any;

  @Output() filterChange = new EventEmitter<any>();

  constructor(protected filterOptionService: FilterOptionsService) {}

  onFilterChange(filters: any) {
    this.filterChange.emit(filters);
  }

  // onSearchTextChange(searchText: string) {
  //   this.searchTerm.emit(searchText);
  // }

  loadFilters() {
    this.filterOptionService.loadFilters();
  }
}
