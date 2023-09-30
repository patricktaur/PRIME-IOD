import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterOptionsService } from '@app/prism/shared-comps/filter-options.service';

@Component({
  selector: 'app-sponsor-filter',
  templateUrl: './sponsor-filter.component.html',
  styleUrls: ['./sponsor-filter.component.css']
})
export class SponsorFilterComponent implements OnInit {
  @Input() inputRecords: any;
  @Output() filteredRecords = new EventEmitter<any>();

  filterOptions: any;

  constructor(private filterOptionsService: FilterOptionsService) {}

  ngOnInit(): void {
    this.subscribeToFilters();
    this.onFiltersChange(this.inputRecords);
  }

  subscribeToFilters() {
    let xyz = this.filterOptionsService._filters.subscribe((filters: any) => {
      this.filterOptions = filters;
    });
  }

  onFiltersChange(filteredRecords: any) {
    this.filteredRecords.emit(filteredRecords);
  }
}
