import { Component, OnInit, ComponentFactoryResolver, ViewChild, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { ColumnManagerComponent } from '@app/shared/column-manager/column-manager/column-manager.component';
import { PlaceholderDirective } from '@app/shared/directives/placeholder.directive';
import { FilterComponentService } from '@app/prism/reports/filter-component.service';
import { IFilter } from '@app/prism/reports/filter-shell/ifilter';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
// import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-report-server-side-filter-n-pagination',
  templateUrl: './report-server-side-filter-n-pagination.component.html',
  styleUrls: ['./report-server-side-filter-n-pagination.component.css']
})
export class ReportServerSideFilterNPaginationComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true }) placeholder: PlaceholderDirective | undefined;

  componentRef: ComponentRef<any> | undefined;

  title = 'abcd';
  records: any;
  recordCount: number = 0;
  filteredRecords: any;

  testFilteredRecords: any;

  report: any;
  gridProperties: any = {};
  columns: any = [];
  pageNumber = 1;
  pageSize = 10;
  isLoading: boolean = true;

  filterGroup: number | undefined;

  downloadApiPath: any;

  filters: PaginationAndStudyFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    region: [],
    sort: '',
    portfolio: [],
    cdms: [],
    dmpm: [],
    dmpmManager: [],
    status: [],
    sponsor: [],
    specialProject: [],
    studyType: [],
    resource: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studyReportService: StudyReportService,
    private modalService: NgbModal,
    private componentFactoryResolver: ComponentFactoryResolver,
    private filterComponentService: FilterComponentService,
    private cd: ChangeDetectorRef
  ) {
    //causes infinte loop after returning to StudyGroupContainerComponent:
    // this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //   return false;
    // };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.report = params.report;
      if (this.report) {
        this.loadUIGridProperties();
        this.loadReport();
        this.downloadApiPath = `api/${this.report}/download-csv-s`;
      }

      // if (!this.report) {
      //   this.route.data.subscribe(data => {
      //     this.report = data.report;
      //     this.loadUIGridProperties();
      //     this.downloadApiPath = `api/${this.report}/download-csv-s`;
      //   });
      // }
    });

    // this.loadUIGridProperties();
    // this.downloadApiPath = `api/${this.report}/download-csv`;
  }

  loadUIGridProperties() {
    // this.isLoading = true;
    this.title = 'Loading ...';
    // this.columns = null;

    this.studyReportService.getReportUIGrid_S(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.gridProperties = res;
          this.title = this.gridProperties.title;
          this.columns = this.gridProperties.columns;
          this.filterGroup = this.gridProperties.filterGroup;

          this.cd.detectChanges();
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadReport() {
    // this.isLoading = true;
    this.records = null;

    this.studyReportService.getStudyReportWithServerSideFilters(this.report, this.filters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res.records;
          this.recordCount = res.recordCount;
          this.filteredRecords = res;
        }
        this.isLoading = false;
        console.log(this.records);
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // onFilteredRecordsChange(filteredRecords: any) {
  //   this.filteredRecords = filteredRecords;
  // }

  onFilterChange(filters: PaginationAndStudyFilters) {
    this.filters = filters;

    this.loadReport();
  }

  onPageChange(pageOptions: any) {
    this.filters.pageNumber = pageOptions.page;
    this.filters.pageSize = pageOptions.pageSize;
    console.log('BBBB');
    this.loadReport();
  }

  openColumnManager() {
    const modalRef = this.modalService.open(ColumnManagerComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      scrollable: true
    });

    modalRef.componentInstance.columns = this.columns;

    modalRef.componentInstance.columnChange.subscribe((chg: any) => {
      this.updateColumns(chg.columns);
    });
  }

  updateColumns(modifiedColumns: any) {
    this.columns.forEach((element: any, index: number) => {
      element.hide = modifiedColumns[index].checked;
    });
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    // console.log(`url = ${location.href.includes(`/reports/`)}`);
    // console.log(`reports dropdown = ${reportsDropdown?.innerHTML}`)
    reportsDropdown?.click();
  }
 
  get csvfileName() {
    let recOf = '';
    if (this.filteredRecords && this.filteredRecords.length > 0) {
      if (this.filteredRecords.length == this.records.length) {
        recOf = 'All-Of-' + this.records.length;
      } else {
        recOf = this.filteredRecords.length + '-Of-' + this.records.length;
      }
    }
    return this.title + '-' + recOf + '-records.csv';
  }
}
