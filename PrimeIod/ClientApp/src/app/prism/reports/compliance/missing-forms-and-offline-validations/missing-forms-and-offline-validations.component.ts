import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComplianceReportService } from '@app/prism/reports/compliance/compliance-report.service';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';

@Component({
  selector: 'app-missing-forms-and-offline-validations',
  templateUrl: './missing-forms-and-offline-validations.component.html',
  styleUrls: ['./missing-forms-and-offline-validations.component.css']
})
export class MissingFormsAndOfflineValidationsComponent implements OnInit {
  missingFormsRecords: any[] = [];
  OfflineValidationRecords: any = [];

  offlineValidationReportName: string = 'abc';

  studyIds: number[] = [];
  sutydIdChunks: number[][] = [];

  filters: any;

  filteredStudies: any;
  filteredOneStudies: any;

  isLoading: boolean = false;
  searchTerm = '';
  isDataLoaded = false;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filter: FormControl = new FormControl('');

  loadCounter: number = 0;

  requestedStudyCount: number = 0;

  constructor(
    private complianceReportService: ComplianceReportService,
    private studyReportService: StudyReportService
  ) {}

  ngOnInit(): void {
    //OfflineValidationReport failed in Icon Prod.
    //this.loadOfflineValidationsReport();
    //Altv:
    this.loadReportIdsChunk();

    this.loadMissingFormsReport();
  }

  loadMissingFormsReport() {
    this.isLoading = true;
    this.complianceReportService.getMisingFormsReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.missingFormsRecords = res;
          // if (this.activeStudies) {
          //   this.filteredStudies = this.activeStudies;
          //   this.filteredOneStudies = this.activeStudies;
          // }
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  //this method is not called, report is loaded in chunks.
  loadOfflineValidationsReport() {
    this.isLoading = true;
    this.complianceReportService.getOfflineValidationsReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.OfflineValidationRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  //----
  //Alternate method for offline validation
  //the first report failed in ICON Prod
  loadReportIdsChunk() {
    this.complianceReportService.getOfflineValidationsStudyIdChunks().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.sutydIdChunks = res;
          this.loadReportByStudyIds(this.sutydIdChunks);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  loadReportByStudyIds(studyIdChunks: number[][]) {
    studyIdChunks.forEach(ele => {
      this.getReportByStudyIds(ele);
    });
  }

  getReportByStudyIds(studyIds: number[]): any {
    this.isLoading = true;

    this.complianceReportService.getOfflineValidationsByStudyIds(studyIds).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          console.log('In getReportByStudyIds');
          this.loadCounter += 1;
          this.requestedStudyCount += studyIds.length;
          this.filteredOfflineValidationRecords.push(...res);
          this.isLoading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  get sortedOfflineValidationRecords(): any {
    return this.filteredOfflineValidationRecords.sort((a: any, b: any) =>
      a.studyIconNumber < b.studyIconNumber ? -1 : 1
    );
  }

  get totalStudies(): number {
    const totalProducts = this.sutydIdChunks.reduce((count, current) => count + current.length, 0);
    return totalProducts;
  }
  //----

  onFilterChange(selectedFilters: any) {
    this.filters = selectedFilters;
  }

  get filteredMissingFormsecords() {
    return this.filteredRecords(this.missingFormsRecords);
  }

  get filteredOfflineValidationRecords() {
    return this.filteredRecords(this.OfflineValidationRecords);
  }

  filteredRecords(records: any[]) {
    const recs: any[] = records; // this.OfflineValidationRecords;

    if (this.filters) {
      let filter1 = recs;
      if (this.filters.region && this.filters.region.length > 0) {
        filter1 = [];
        filter1 = recs.filter((n: any) => this.filters.region.indexOf(n.region) !== -1);
      }
      let filter2 = filter1;
      if (this.filters.portfolio && this.filters.portfolio.length > 0) {
        filter2 = [];
        filter2 = filter1.filter((n: any) => this.filters.portfolio.indexOf(n.portfolio) !== -1);
      }

      let filter3 = filter2;
      if (this.filters.dmpm && this.filters.dmpm.length > 0) {
        filter3 = [];
        filter3 = filter2.filter((n: any) => this.filters.dmpm.some((v: any) => n.currentDmpm?.includes(v)));
      }

      let filter4 = filter3;
      if (this.filters.cdms && this.filters.cdms.length > 0) {
        filter4 = [];
        filter4 = filter3.filter((n: any) => this.filters.cdms.indexOf(n.cdms) !== -1);
      }
      return filter4;
    }

    return recs;
  }

  onFilterOneChange(filteredRecords: any) {
    this.filteredOneStudies = filteredRecords;
    this.onFilterTwoChange(this.filteredOneStudies);
  }

  onSearchTextChange(searchText: string) {
    this.searchTerm = searchText;
  }

  onFilterTwoChange(filteredRecords: any) {
    this.filteredStudies = filteredRecords;
  }

  get activeRecordsCount() {
    if (!this.filteredStudies) {
      return;
    }
    return this.filteredStudies.length;
  }

  get missingFormsCount() {
    if (!this.filteredMissingFormsecords) {
      return;
    }
    //  return this.activeStudies.filter((n: any) => n.isCompliant == true).length;
    return this.filteredMissingFormsecords.length;
  }

  get ReviewOverDueByDMPMRecords() {
    if (!this.filteredStudies) {
      return;
    }
    // return this.filteredStudies.filter((n: any) => n.isReviewOverDueByDMPM == true);
    return this.filteredStudies.filter((n: any) => n.studyReviewPendingWithDMPM === true);
  }

  get offlineValidationRecordsCount() {
    if (!this.filteredOfflineValidationRecords) {
      return;
    }

    // return this.activeStudies.filter((n: any) => n.isReviewOverDueByDMPM == true).length;
    return this.filteredOfflineValidationRecords.length;
  }

  get ReviewOverDueByDMPMManagerRecords() {
    if (!this.filteredStudies) {
      return;
    }

    return this.filteredStudies.filter((n: any) => n.studyReviewPendingWithDMPMManager === true);
  }

  get ReviewOverDueByDMPMManagerCount() {
    if (!this.ReviewOverDueByDMPMManagerRecords) {
      return;
    }

    // return this.activeStudies.filter((n: any) => n.isReviewOverDueByDMPMManager == true).length;
    return this.ReviewOverDueByDMPMManagerRecords.length;
  }
}
