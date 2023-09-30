import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
@Component({
  selector: 'app-external-data-report-filter',
  templateUrl: './external-data-report-filter.component.html',
  styleUrls: ['./external-data-report-filter.component.css']
})
export class ExternalDataReportFilterComponent implements OnInit {
  @Input() records: any;
  @Output() filterChange = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter<any>();

  filterForm : FormControl = new FormControl('');

  filters: any;

  dataTypeFilters: any;
  vendorNameFilters: any;
  frequencyOfTransferFilters: any;
  dtsStatusFilters: any;
  testTransferStatusFilter: any;
  reconListingStatusFilter: any;

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();
    this.filterForm.valueChanges.subscribe(val => {
      this.onSearchTextChange();
    });
  }

  loadFilters() {
    this.sharedCompsService.getExternalDataReportFilters().subscribe(
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
            .indexOf(this.filterForm.value) !== -1
      );
    }

    let filter2 = filter1;
    if (this.dataTypeFilters && this.dataTypeFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.dataTypeFilters.indexOf(n.dataType) !== -1);
    }

    let filter3 = filter2;
    if (this.vendorNameFilters && this.vendorNameFilters.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => this.vendorNameFilters.indexOf(n.vendorName) !== -1);
    }

    let filter4 = filter3;
    if (this.frequencyOfTransferFilters && this.frequencyOfTransferFilters.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => this.frequencyOfTransferFilters.indexOf(n.frequencyOfTransferId) !== -1);
    }

    let filter5 = filter4;
    if (this.dtsStatusFilters && this.dtsStatusFilters.length > 0) {
      filter5 = null;
      filter5 = filter4.filter((n: any) => this.dtsStatusFilters.indexOf(n.dtsstatusId) !== -1);
    }

    let filter6 = filter5;
    if (this.testTransferStatusFilter && this.testTransferStatusFilter.length > 0) {
      filter6 = null;
      filter6 = filter5.filter((n: any) => this.testTransferStatusFilter.indexOf(n.testTransferStatusId) !== -1);
    }

    let filter7 = filter6;
    if (this.reconListingStatusFilter && this.reconListingStatusFilter.length > 0) {
      filter7 = null;
      filter7 = filter5.filter(
        (n: any) => this.reconListingStatusFilter.indexOf(n.reconciliationListingStatusId) !== -1
      );
    }

    // dtsStatusFilters: any;
    // testTransferStatusFilter: any;
    // reconciliationListingStatusFilter: any;

    return filter7;
  }

  onFiltersChange() {
    this.filterChange.emit(this.filterRecords);
  }

  onSearchTextChange() {
    this.onFiltersChange();
    this.searchTextChange.emit(this.filterForm.value);
  }
}
