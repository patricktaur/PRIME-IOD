import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

@Component({
  selector: 'app-cdms-tracker-filter',
  templateUrl: './cdms-tracker-filter.component.html',
  styleUrls: ['./cdms-tracker-filter.component.css']
})
export class CdmsTrackerFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();

  filterForm : FormControl = new FormControl('');
  filters: any;
  regionFilters: string[] = [];
  cdmsFilters: string[] = [];
  // primaryCdmsLeadFilters: string[];
  // secondaryCdmsLeadFilters: string[];

  taskFilters: string[] = [];

  taskGroupFilters: string[] = [];

  taskStatusFilters: string[] = [];

  itemStatusFilters: string[] = [];

  filteredOneStudies: any;
  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    // this.filteredOneStudies = this.records;
    this.loadFilters();
    this.filterForm.valueChanges.subscribe(val => {
      this.onSearchTextChange();
    });
  }
  loadFilters() {
    this.sharedCompsService.getCdmsTasksFilters().subscribe(
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
  //

  onFilterOneChange(filteredRecords: any) {
    this.filteredOneStudies = filteredRecords;
    this.onFiltersChange();
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }

  onSearchTextChange() {
    this.onFiltersChange();
    // this.searchTextChange.emit(this.filterForm.value);
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
    if (this.cdmsFilters && this.cdmsFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.cdmsFilters.indexOf(n.cdms) != -1);
    }

    // let filter4 = filter3;
    // if (this.primaryCdmsLeadFilters && this.primaryCdmsLeadFilters.length > 0) {
    //   filter4 = null;
    //   filter4 = filter3.filter((n: any) => this.primaryCdmsLeadFilters.some((v: any) => n.cdmsLeadName?.includes(v)));
    // }

    // let filter5 = filter4;
    // if (this.secondaryCdmsLeadFilters && this.secondaryCdmsLeadFilters.length > 0) {
    //   filter5 = null;
    //   filter5 = filter4.filter((n: any) =>
    //     this.secondaryCdmsLeadFilters.some((v: any) => n.secondCdmsLeadName?.includes(v))
    //   );
    // }
    //CdmstaskListTaskName
    let filter6 = filter3;
    if (this.taskFilters && this.taskFilters.length > 0) {
      filter6 = null;
      filter6 = filter3.filter((n: any) => this.taskFilters.some((v: any) => n.cdmstaskListTaskName?.includes(v)));
    }

    let filter7 = filter6;
    if (this.taskGroupFilters && this.taskGroupFilters.length > 0) {
      filter7 = null;
      filter7 = filter6.filter((n: any) =>
        this.taskGroupFilters.some((v: any) => n.cdmstaskListTaskGroupTitle?.includes(v))
      );
    }

    let filter8 = filter7;
    if (this.taskStatusFilters && this.taskStatusFilters.length > 0) {
      filter8 = null;
      filter8 = filter7.filter((n: any) =>
        this.taskStatusFilters.some((v: any) => n.cdmstaskListCppcstatus?.includes(v))
      );
    }

    let filter9 = filter8;
    if (this.itemStatusFilters && this.itemStatusFilters.length > 0) {
      filter9 = null;
      filter9 = filter8.filter((n: any) =>
        this.itemStatusFilters.some((v: any) => n.cdmstaskListItemStatus?.includes(v))
      );
    }

    return filter9;
  }
}
