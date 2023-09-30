import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
@Component({
  selector: 'app-study-review-filter',
  templateUrl: './study-review-filter.component.html',
  styleUrls: ['./study-review-filter.component.css']
})
export class StudyReviewFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();
  filters: any;

  specialProjectFilters: any;
  frequencyFilters: any;

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.sharedCompsService.getDMFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
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
    // let filter1 = this.records;
    // if (this.specialProjectFilters && this.specialProjectFilters.length > 0){
    //   filter1 = null;
    //   filter1 = this.records.filter((n: any) => this.specialProjectFilters.indexOf(n.isSpecialProject) !=-1);
    // }

    let filter1 = this.records;
    // let filter2 = filter1;
    if (this.frequencyFilters && this.frequencyFilters.length > 0) {
      filter1 = null;
      filter1 = this.records.filter((n: any) => this.frequencyFilters.indexOf(n.studyReviewCyclePid) != -1);
    }

    return filter1;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }
}
