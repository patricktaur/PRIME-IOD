import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';

import { PrismHomeService } from '@app/prism/prism-home/prism-home.service';

import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.css']
})
export class StudyListComponent implements OnInit, OnDestroy {
  records: any = [];
  currentUser: any;

  recordCount: number = 0;
  filteredRecords: any;

  filteredStudies: any;
  searchTerm = '';
  isDataLoaded = false;
  isLoading = false;
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filter: FormControl = new FormControl('');
  reload: any;
  private uploadResponse: any;
  closeResult: string = '';
  filterValues: any;

  report = 'vwStudyListV2';
  defaultStatus = 0;
  //defaultResource = 594;
  selectedFilters: PaginationAndStudyFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    region: [],
    sort: 'asc',
    portfolio: [],
    cdms: [],
    dmpm: [],
    dmpmManager: [],
    status: [0],
    sponsor: [],
    specialProject: [],
    studyType: [],
    resource: []
  };

  //rol.admin, rol.DMPM, rol.DMPM_Manager, rol.CDMS_Lead, rol.CDMS_Manager, rol.CDS_Manager, rol.CDPL, rol.QR, rol.LL, rol.IMI_TPM, rol.IMI_PD_PM

  requiredPermissions: any = {
    resource:
      'rol.admin, rol.DMPM, rol.DMPM_Manager, rol.CDMS_Lead, rol.CDMS_Manager, rol.CDS_Manager, rol.CDPL, rol.QR, rol.LL, rol.IMI_TPM, rol.IMI_PD_PM '
  };

  permissions: any;
  loadSub: Subscription | undefined;

  testValue: any;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private credSerivce: CredentialsService,
    private prismHomeService: PrismHomeService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit() {
    this.currentUser = this.credSerivce.currentUser;
    this.permissions = this.credSerivce.userPermissions;

    this.selectedFilters.resource.push(this.currentUser.id);
    this.selectedFilters.status.push(0);

    this.loadReport();

    this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // console.log("st:" + JSON.stringify(st));
      this.testValue = st;
    });
  }

  loadReport() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.prismHomeService.getStudyList(this.selectedFilters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res.records;
          this.recordCount = res.recordCount;
          this.filteredRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(filters: PaginationAndStudyFilters) {
    this.selectedFilters = filters;

    this.loadReport();
  }

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }

  async onRaiseEvent(value: any) {
    let id = value?.actionValue;
    
    await this.studyEditService.setStudyIdAndLoadProperties(id);
    await this.router.navigate(['/study'], { relativeTo: this.actRoute.parent });
    
  }

  columns: Array<UIGridColumn> = [
    // {
    //   header: 'Icon Number',
    //   field: 'studyIconNumber',
    //   actionType: 'link',
    //   linkField: 'studyId',
    //   linkPath: '/study'
    // },
    {
      header: 'Icon Number',
      field: 'studyIconNumber',
      actionType: 'raise-event',
      // linkField: 'studyId',
      // linkPath: '/study',
      // actionCommand: 'open',
      actionField: 'studyId'
    },

    {
      header: 'Study Type',
      field: 'studyType'
    },
    {
      header: 'Study Name',
      field: 'studyName',
      width: 100 //source {type: 'clothes'}
    },

    {
      header: 'Sponsor',
      field: 'sponsor',
      width: 100
    },
    {
      header: 'Status',
      field: 'statusText'
    },
    {
      header: 'FPI',
      field: 'fpi',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Main DBL',
      field: 'mainDBL',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    //FPI, MainDBL
    {
      header: 'Project Score',
      field: 'overideProjectScore',
      align: 'center',
      backgroundStyle: 'one-to-five-score',
      width: 10
    },
    {
      header: 'Alerts',
      field: 'alertsX', //suppressed until task sections is ready in V2
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
