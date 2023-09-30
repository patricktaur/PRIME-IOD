import { Component } from '@angular/core';
import { CdsArchivedDataService } from '../cds-archived-data.service';

@Component({
  selector: 'app-cds-output-archived-data',
  templateUrl: './cds-output-archived-data.component.html',
  styleUrls: ['./cds-output-archived-data.component.css']
})
export class CdsOutputArchivedDataComponent {
  loading = false;

  fileRecords: any = [];
  filteredFileRecords: any = [];

  selectedFilters: any = {};

  downloadInProgress: boolean = false;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private cdsArchivedDataService: CdsArchivedDataService) {}

  ngOnInit() {
    this.getOutputReuestArchivedData();
  }

  getOutputReuestArchivedData() {
    this.loading = true;
    this.cdsArchivedDataService.getOutputRequestArchivedData()
    .subscribe((res: any) => {
      this.fileRecords = res;
      // console.log(`file records = ${JSON.stringify(this.fileRecords, null, 2)}`);
      this.totalItems = this.fileRecords.length;

      // this.onPageChange({page: this.pageNumber, pageSize: this.pageSize});
      this.getFilteredRecords();
      this.loading = false;
    })
  }

  downloadFile(cdsArchivedData: any) {
    // console.log(`cdsArchivedData = ${JSON.stringify(cdsArchivedData, null, 2)}`);
    this.downloadInProgress = true;
    this.cdsArchivedDataService.downloadOutputReqFile(cdsArchivedData)
    .subscribe((res: any) => {
      this.saveFile(res, cdsArchivedData.link);
      this.downloadInProgress = false;
    })
  }

  saveFile(response: any, fileName: any) {
    const url = window.URL.createObjectURL(new Blob([response]));

    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
  }

  onPageChange(event: any) {
    this.pageNumber = event.page;
    this.pageSize = event.pageSize;

    this.getFilteredRecords();
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
    this.getFilteredRecords();
  }

  getFilteredRecords() {
    this.filteredFileRecords = this.fileRecords;

    if(this.selectedFilters.fromDate) {
      this.filteredFileRecords = this.filteredFileRecords.filter((x: any) => new Date(x.fileCreatedOn) >= new Date(this.selectedFilters.fromDate));
    }

    if(this.selectedFilters.toDate) {
      this.filteredFileRecords = this.filteredFileRecords.filter((x: any) => new Date(x.fileCreatedOn) <= new Date(this.selectedFilters.toDate));
    }

    this.totalItems = this.filteredFileRecords.length;

    this.filteredFileRecords = this.filteredFileRecords.slice(
			(this.pageNumber - 1) * this.pageSize,
			(this.pageNumber - 1) * this.pageSize + this.pageSize
		);
  }

  onResetFilters() {
    this.selectedFilters = {};
  }
}
