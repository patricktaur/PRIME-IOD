import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-imi-timeline-filter',
  templateUrl: './imi-timeline-filter.component.html',
  styleUrls: ['./imi-timeline-filter.component.css']
})
export class ImiTimelineFilterComponent implements OnInit {
  public isCollapsed = false;

  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter<any>();

  filterForm: FormControl = new FormControl('');

  filters: any;
  regionFilters: string[] = [];
  portfolioFilters: any;
  cdmsFilters: any;
  cdmsLeadFilter: any;
  coveringCdmsLeadFilter: any;
  imiCdmsLeadFilter: any;
  imiCoveringCdmsLeadFilter: any;

  statusFilters: any;
  sponsorFilters: any;

  specialProjectFilters: any;

  frequencyFilters: any;

  studyTypeFilters: any;

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();

    this.filterForm.valueChanges.subscribe(val => {
      this.onSearchTextChange();
    });
  }

  loadFilters() {
    // this.sharedCompsService.getDMFilters().subscribe(
    this.sharedCompsService.getDmImiCdmsFilters().subscribe(
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

  get filterRecords() {
    let studyNameLower = '';
    studyNameLower = this.filterForm.value;
    studyNameLower = studyNameLower.toLowerCase();
    let filter1 = this.records;
    if (this.filterForm.value.length > 0) {
      filter1 = null;
      filter1 = this.records.filter(
        (x: any) =>
          x.studyIconNumber
            .toString()
            .toLowerCase()
            .indexOf(this.filterForm.value) != -1 ||
          x.studyName
            .toString()
            .toLowerCase()
            .indexOf(studyNameLower) != -1
      );
    }

    let filter2 = filter1;
    if (this.regionFilters && this.regionFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.regionFilters.indexOf(n.region) != -1);
    }

    let filter3 = filter2;
    if (this.portfolioFilters && this.portfolioFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.portfolioFilters.indexOf(n.portfolio) != -1);
    }

    let filter4 = filter3;
    if (this.cdmsFilters && this.cdmsFilters.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.cdmsFilters.indexOf(n.cdms) != -1);
    }

    let filter5 = filter4;
    if (this.sponsorFilters && this.sponsorFilters.length > 0) {
      filter5 = null;
      filter5 = filter4.filter((n: any) => this.sponsorFilters.indexOf(n.sponsor) != -1);
    }

    let filter6 = filter5;
    if (this.statusFilters && this.statusFilters.length > 0) {
      filter6 = null;
      filter6 = filter5.filter((n: any) => this.statusFilters.indexOf(n.studyStatusText) != -1);
    }

    return filter6;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }

  onSearchTextChange() {
    this.onFiltersChange();
    this.searchTextChange.emit(this.filterForm.value);
  }
}
