import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-dm-icon-number-sponsor-filter',
  templateUrl: './dm-icon-number-sponsor-filter.component.html',
  styleUrls: ['./dm-icon-number-sponsor-filter.component.css']
})
export class DmIconNumberSponsorFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();

  filters: any;
  // selectedFilters : any;
  iconNumbersFilters: string[] = [];
  sponosorfilters: string[] = [];
  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    // this.isLoading = true;
    // this.filterValues.pageNo = this.pageNumber;
    // this.filterValues.pageSize = this.pageSize;

    this.sharedCompsService.getDMStudyIconAndSponsorFilters().subscribe(
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
      filter1 = this.records.filter((n: any) => this.iconNumbersFilters.indexOf(n.studyIconNumber) != -1);
    }
    // sponosorfilters
    let filter2 = filter1;
    if (this.sponosorfilters && this.sponosorfilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.sponosorfilters.indexOf(n.sponsor) != -1);
    }

    return filter2;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }
}
