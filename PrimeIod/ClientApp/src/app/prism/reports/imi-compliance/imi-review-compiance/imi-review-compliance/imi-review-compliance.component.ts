import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { ImiComplianceReportService } from '@app/prism/reports/imi-compliance/imi-compliance-report.service';
@Component({
  selector: 'app-imi-review-compliance',
  templateUrl: './imi-review-compliance.component.html',
  styleUrls: ['./imi-review-compliance.component.css']
})
export class ImiReviewComplianceComponent implements OnInit {
  title = 'IMI Review Compliance';
  activeStudies: any;
  filteredStudies: any;
  filteredOneStudies: any;

  isLoading: boolean = false;
  searchTerm = '';
  isDataLoaded = false;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filter: FormControl = new FormControl('');

  constructor(private studyReportService: ImiComplianceReportService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.studyReportService.getReviewComplianceReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.activeStudies = res;
          if (this.activeStudies) {
            this.filteredStudies = this.activeStudies;
            this.filteredOneStudies = this.activeStudies;
          }
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(filteredRecords: any) {
    this.filteredStudies = filteredRecords;
  }

  // onFilterOneChange(filteredRecords: any) {
  //   this.filteredOneStudies = filteredRecords;
  //   this.onFilterTwoChange(this.filteredOneStudies);
  // }

  onSearchTextChange(searchText: string) {
    this.searchTerm = searchText;
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  // onFilterTwoChange(filteredRecords: any) {
  //   this.filteredStudies = filteredRecords;
  // }

  get activeRecordsCount() {
    if (!this.filteredStudies) {
      return;
    }
    return this.filteredStudies.length;
  }
  get compliantRecords(): any[] {
    if (!this.filteredStudies) {
      return [];
    }
    // return this.filteredStudies.filter((n: any) => n.isCompliant == true);
    return this.filteredStudies.filter((n: any) => n.studyIsCompliant == true);
  }
  get isCompliantCount(): number {
    if (!this.compliantRecords) {
      return 0;
    }
    //  return this.activeStudies.filter((n: any) => n.isCompliant == true).length;
    return this.compliantRecords.length;
  }

  get ReviewOverDueByDMPMRecords(): any[] {
    if (!this.filteredStudies) {
      return [];
    }
    // return this.filteredStudies.filter((n: any) => n.isReviewOverDueByDMPM == true);
    return this.filteredStudies.filter((n: any) => n.studyReviewPendingWithDMPM == true);
  }

  get ReviewOverDueByDMPMCount(): number {
    if (!this.ReviewOverDueByDMPMRecords) {
      return 0;
    }

    // return this.activeStudies.filter((n: any) => n.isReviewOverDueByDMPM == true).length;
    return this.ReviewOverDueByDMPMRecords.length;
  }

  get ReviewOverDueByDMPMManagerRecords(): any[] {
    if (!this.filteredStudies) {
      return [];
    }

    return this.filteredStudies.filter((n: any) => n.studyReviewPendingWithDMPMManager == true);
  }

  get ReviewOverDueByDMPMManagerCount(): number {
    if (!this.ReviewOverDueByDMPMManagerRecords) {
      return 0;
    }

    // return this.activeStudies.filter((n: any) => n.isReviewOverDueByDMPMManager == true).length;
    return this.ReviewOverDueByDMPMManagerRecords.length;
  }

  get noReviewSoSarRecords(): any[] {
    if (!this.filteredStudies) {
      return [];
    }

    return this.filteredStudies.filter((n: any) => n.noProjectReviewSoFar == true);
  }

  get noReviewSoSarCount(): number {
    if (!this.noReviewSoSarRecords) {
      return 0;
    }

    return this.noReviewSoSarRecords.length;
  }

  get csvfileName() {
    let recOf = '';
    if (this.filteredStudies && this.filteredStudies.length > 0) {
      if (this.filteredStudies.length == this.activeStudies.length) {
        recOf = 'All-Of-' + this.activeStudies.length;
      } else {
        recOf = this.filteredStudies.length + '-Of-' + this.activeStudies.length;
      }
    }
    return this.title + '-' + recOf + '-records.csv';
  }

  //required for csv export:
  columns: Array<any> = [
    {
      header: 'ICON Number',
      field: 'studyIconNumber'
    },
    {
      header: 'Study Name',
      field: 'studyName'
    },
    {
      header: 'Portfolio',
      field: 'portfolio'
    },
    {
      header: 'Sponsor',
      field: 'sponsor'
    },
    {
      header: 'Review Cycle',
      field: 'studyReviewCyclePid'
    },
    {
      header: 'Planned Review Date',
      field: 'studyReviewNextDueDate'
    },
    {
      header: 'Last Review Date',
      field: 'studyReviewLastReviewedOn'
    },

    {
      header: 'Last Reviewed By',
      field: 'studyReviewLastReviewedBy'
    },
    {
      header: 'Project Review Overdue',
      field: 'studyReviewIsReviewOverDueYesNo'
    },
    {
      header: 'Number of days Overdue',
      field: 'studyReviewOverDueDays'
    },
    {
      header: 'Difference in days of Planned to Actual review dates',
      field: 'studyReviewDiffPlannedToActual'
    },
    {
      header: 'Region',
      field: 'region'
    },
    {
      header: 'Status',
      field: 'studyStatusText'
    },

    {
      header: 'Project Director',
      field: 'currentPmPd'
    },
    {
      header: 'Project Manager',
      field: 'currentPm'
    },
    {
      header: 'CDMS',
      field: 'cdms'
    }
  ];
}
