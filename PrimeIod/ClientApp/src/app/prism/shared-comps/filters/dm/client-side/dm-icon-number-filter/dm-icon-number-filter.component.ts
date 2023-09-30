import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-dm-icon-number-filter',
  templateUrl: './dm-icon-number-filter.component.html',
  styleUrls: ['./dm-icon-number-filter.component.css']
})
export class DmIconNumberFilterComponent implements OnInit {
  @Input() records: any;
  @Input() multiple: boolean = true; //can select multiple IconNumbers
  @Output() filterChange = new EventEmitter<any>();

  filters: any;
  iconNumbersFilters: string[] = [];

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    // this.isLoading = true;
    // this.filterValues.pageNo = this.pageNumber;
    // this.filterValues.pageSize = this.pageSize;

    this.sharedCompsService.getDMStudyIconNumbers().subscribe(
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

    if (this.iconNumbersFilters && this.iconNumbersFilters.length > 0) {
      filter1 = null;
      filter1 = this.records?.filter((n: any) => this.iconNumbersFilters.indexOf(n.studyIconNumber) != -1);
    }

    return filter1;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }
}
