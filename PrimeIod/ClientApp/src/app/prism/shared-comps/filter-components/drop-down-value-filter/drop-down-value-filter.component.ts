import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down-value-filter',
  templateUrl: './drop-down-value-filter.component.html',
  styleUrls: ['./drop-down-value-filter.component.css']
})
export class DropDownValueFilterComponent implements OnInit {
  @Input() filterOptions: any;
  @Input() filterField: string = '';

  // @Input() inputRecords: any;

  @Input() set inputRecords(value: any) {
    this._inputRecords = value;
    this.onFiltersChange();
  }

  @Input() label: string = "";

  @Input() placeHolder: string = "";
  @Output() filteredRecords = new EventEmitter<any>();

  _inputRecords: any;
  selectedFilters: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  getFilteredRecords() {
    let filteredRecords = this._inputRecords;
    if (this.selectedFilters && this.selectedFilters.length > 0) {
      filteredRecords = null;

      filteredRecords = this._inputRecords?.filter((n: any) => this.selectedFilters.indexOf(n[this.filterField]) != -1);
    }
    return filteredRecords;
  }

  onFiltersChange() {
    this.filteredRecords.emit(this.getFilteredRecords());
  }
}
