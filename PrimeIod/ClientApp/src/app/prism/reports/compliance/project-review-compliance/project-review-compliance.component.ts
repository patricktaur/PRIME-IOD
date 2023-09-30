import { Component, OnInit } from '@angular/core';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-review-compliance',
  templateUrl: './project-review-compliance.component.html',
  styleUrls: ['./project-review-compliance.component.css']
})
export class ProjectReviewComplianceComponent implements OnInit {
  title = 'Compliance Report';
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

  constructor(private studyReportService: StudyReportService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.studyReportService.getProjectReviewComplianceReport().subscribe(
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

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  get activeRecordsCount() {
    if (!this.filteredStudies) {
      return 0;
    }
    return this.filteredStudies.length;
  }
  get compliantRecords() {
    if (!this.filteredStudies) {
      return [];
    }
    // return this.filteredStudies.filter((n: any) => n.isCompliant == true);
    return this.filteredStudies.filter((n: any) => n.studyIsCompliant == true);
  }
  get isCompliantCount() {
    if (!this.compliantRecords) {
      return 0;
    }
    //  return this.activeStudies.filter((n: any) => n.isCompliant == true).length;
    return this.compliantRecords.length;
  }

  get ReviewOverDueByDMPMRecords() {
    if (!this.filteredStudies) {
      return [];
    }
    // return this.filteredStudies.filter((n: any) => n.isReviewOverDueByDMPM == true);
    return this.filteredStudies.filter((n: any) => n.studyReviewPendingWithDMPM == true);
  }

  get ReviewOverDueByDMPMCount() {
    if (!this.ReviewOverDueByDMPMRecords) {
      return 0;
    }

    // return this.activeStudies.filter((n: any) => n.isReviewOverDueByDMPM == true).length;
    return this.ReviewOverDueByDMPMRecords.length;
  }

  get ReviewOverDueByDMPMManagerRecords() {
    if (!this.filteredStudies) {
      return 0;
    }

    return this.filteredStudies.filter((n: any) => n.studyReviewPendingWithDMPMManager == true);
  }

  get ReviewOverDueByDMPMManagerCount() {
    if (!this.ReviewOverDueByDMPMManagerRecords) {
      return 0;
    }

    // return this.activeStudies.filter((n: any) => n.isReviewOverDueByDMPMManager == true).length;
    return this.ReviewOverDueByDMPMManagerRecords.length;
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
      header: 'Project review Overdue',
      field: 'studyReviewIsReviewOverDueYesNo'
    },
    {
      header: 'Number of days Overdue',
      field: 'studyReviewOverDueDays'
    },
    {
      header: 'Region',
      field: 'region'
    },
    {
      header: 'Portfolio',
      field: 'portfolio'
    },
    {
      header: 'Status',
      field: 'studyStatusText'
    },
    {
      header: 'CDMS',
      field: 'cdms'
    },
    {
      header: 'Director',
      field: 'currentDmpmManager'
    },
    {
      header: 'DMPM',
      field: 'currentDmpm'
    },
    {
      header: 'Sponsor',
      field: 'sponsor'
    }
  ];
}
