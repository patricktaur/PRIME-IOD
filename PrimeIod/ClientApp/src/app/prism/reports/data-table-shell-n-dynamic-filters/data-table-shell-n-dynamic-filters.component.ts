import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewChild,
  ComponentRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';
import { ColumnManagerComponent } from '@app/shared/column-manager/column-manager/column-manager.component';
import { PlaceholderDirective } from '@app/shared/directives/placeholder.directive';
import { FilterComponentService } from '@app/prism/reports/filter-component.service';
// import { IFilter } from '@app/prism/reports/filters/ifilter';
import { IFilter } from '@app/prism/reports/filter-shell/ifilter';
@Component({
  selector: 'app-data-table-shell-n-dynamic-filters',
  templateUrl: './data-table-shell-n-dynamic-filters.component.html',
  styleUrls: ['./data-table-shell-n-dynamic-filters.component.css']
})
export class DataTableShellNDynamicFiltersComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: true })
  placeholder!: PlaceholderDirective;
  // @Input() filteredRecords: any;
  // @Output() recordsChange = new EventEmitter<any>();
  //@Output() changeEmit: EventEmitter<string> = new EventEmitter<string>();

  componentRef: ComponentRef<any> | undefined;

  title = 'abcd';
  records: any = [];
  filteredRecords: any[] = [];

  testFilteredRecords: any;

  report: any;
  gridProperties: any;
  columns: any;
  pageNumber = 1;
  pageSize = 10;
  isLoading: boolean = true;

  filterGroup: number = 0;

  downloadApiPath: any;

  fields = ['Phase', 'Studies', 'Patients', 'Sites'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studyReportService: StudyReportService,
    private modalService: NgbModal,
    private componentFactoryResolver: ComponentFactoryResolver,
    private filterComponentService: FilterComponentService
  ) {
    //causes infinte loop after returning to StudyGroupContainerComponent:
    // this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //   return false;
    // };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.report = params.report;
      if (this.report.endsWith('V2')) {
        this.loadReportA();
        this.loadUIGridPropertiesA();
        this.downloadApiPath = `api/${this.report}/download-csv`;
      } else {
        this.loadReport();
        this.loadUIGridProperties();
        this.downloadApiPath = 'api/studyreports/download-csv?report=' + this.report;
      }
    });
  }

  //--dynamic filters:
  loadComponent(filterGroup: number) {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    const filterComp = this.filterComponentService.getFilter(filterGroup);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(filterComp);
    const viewContainerRef = this.placeholder.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);

    (this.componentRef.instance as IFilter).inputRecords = this.records;
    /** @Output data from our instance  */
    (this.componentRef.instance as IFilter).outputRecords.subscribe((data: any) => this.onFilteredRecordsChange(data));

    // (this.componentRef.instance as IFilter).searchTerm.subscribe(
    //   (data : any) => this.onFilteredRecordsChange(data)
    // );
  }

  loadUIGridProperties() {
    this.isLoading = true;
    this.title = 'Loading ...';
    this.columns = null;
    // this.tblStudyService.getTblStudyList().subscribe(
    this.studyReportService.getStudyReportUIGrid(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.gridProperties = res;
          this.title = this.gridProperties.title;
          this.columns = this.gridProperties.columns;

          console.log('this.filterGroup a:' + this.filterGroup);
          console.log('Grid properties loaded');
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadUIGridPropertiesA() {
    this.isLoading = true;
    this.title = 'Loading ...';
    this.columns = null;
    // this.tblStudyService.getTblStudyList().subscribe(
    this.studyReportService.getReportUIGrid(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.gridProperties = res;
          this.title = this.gridProperties.title;
          this.columns = this.gridProperties.columns;
          this.filterGroup = this.gridProperties.filterGroup;
          console.log('this.filterGroup a:' + this.filterGroup);
          console.log('Grid properties loaded');
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadReport() {
    this.isLoading = true;
    this.records = [];
    // this.tblStudyService.getTblStudyList().subscribe(
    this.studyReportService.getStudyReport(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          this.filteredRecords = res;
          this.filterGroup = this.gridProperties.filterGroup;

          //  this.loadComponent(this.gridProperties.filterGroup);
          //  this.recordsChange.emit(this.records);
          //  this.recordsChange.emit(res);

          // console.log("Records loaded")
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadReportA() {
    this.isLoading = true;
    this.records = [];
    // this.tblStudyService.getTblStudyList().subscribe(
    this.studyReportService.getStudyReportA(this.report).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          this.filteredRecords = res;
          // console.log(`records = ${JSON.stringify(this.records, null, 2)}`);
          //  this.loadComponent(this.gridProperties.filterGroup);
          //  this.recordsChange.emit(this.records);
          //  this.recordsChange.emit(res);

          // console.log("Records loaded")
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilteredRecordsChange(filteredRecords: any) {
    this.filteredRecords = filteredRecords;
  }

  testFilterChange(filteredRecords: any) {
    this.filteredRecords = filteredRecords;
  }

  // onSearchTextChange(value : string) {

  //   this.searchTextChange.emit(this.filterForm.value);
  // }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
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
    console.log(`reports dropdown = ${reportsDropdown?.innerHTML}`)
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
