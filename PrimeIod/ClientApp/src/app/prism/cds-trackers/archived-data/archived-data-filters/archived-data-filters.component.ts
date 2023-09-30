import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-archived-data-filters',
  templateUrl: './archived-data-filters.component.html',
  styleUrls: ['./archived-data-filters.component.css']
})
export class ArchivedDataFiltersComponent {
  @Input() selectedFilters: any = {
    fromDate: null,
    toDate: null
  };

  @Input() showResetButton: boolean = false;
  @Output() filterChange = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.onFiltersChange();
  }

  onFiltersChange() {
    this.filterChange.emit(this.selectedFilters);
  }

  resetFiltersClicked() {
    this.resetFilters.emit(true);
  }
}
