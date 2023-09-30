import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

import { CredentialsService } from '@app/core/authentication/credentials.service';
// import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
import { CrmListFilters } from '../crm-list-filters';
import { PrismHomeService } from '@app/prism/prism-home/prism-home.service';
import { CrmListService } from '@app/prism/crm/crm-shared/crm-list/crm-list.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-crm-list',
  templateUrl: './crm-list.component.html',
  styleUrls: ['./crm-list.component.css']
})
export class CrmListComponent implements OnInit {
  records: any = [];
  recordCount: number = 0;
  filteredStudies: any = {};
  searchTerm = '';
  isDataLoaded = false;
  isLoading = false;
  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  filter = new FormControl('');
  reload: any;
  private uploadResponse: any;
  closeResult: string = '';
  filterValues: any;

  report = 'vwStudyListV2';
  defaultStatus = 0;
  //defaultResource = 594;
  selectedFilters: CrmListFilters = {
    pageNumber: 1,
    pageSize: 10,
    IconNumberOrName: '',
    Sponsor: [],
    cdaCm:[],
    clinicalRiskManager:[],
    centeralMonitoringStatus:[]
  };

  loadSub: Subscription | undefined;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private credSerivce: CredentialsService,
    private crmStudyListService: CrmListService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.crmStudyListService.getStudyListwithFilter(this.selectedFilters).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res.records;
          this.recordCount = res.recordCount;
          // this.filteredRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // get filteredRecords() {
  //   let studyNameLower = '';
  //   studyNameLower = this.selectedFilters.iconNumberOrName.toLowerCase();
  //   studyNameLower = studyNameLower.toLowerCase();

  //   let filter1 = this.records;
  //   if (this.selectedFilters.iconNumberOrName.length > 0) {
  //     filter1 = null;
  //     filter1 = this.records.filter(
  //       //description codelistNameDescription
  //       (x: any) =>
  //         x.studyIconNumber
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(this.selectedFilters.iconNumberOrName) != -1 ||
  //         x.studyName
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(studyNameLower) != -1
  //     );
  //   }

  //   let filter2 = filter1;
  //   if (this.selectedFilters.sponsors && this.selectedFilters.sponsors.length > 0) {
  //     filter2 = null;
  //     filter2 = filter1.filter((n: any) => this.selectedFilters.sponsors.indexOf(n.sponsor) !== -1);
  //   }

  //   let filter3 = filter2;
  //   if (this.selectedFilters.cdaCm && this.selectedFilters.cdaCm.length > 0) {
  //     filter3 = null;
  //     filter3 = filter2.filter((n: any) => this.selectedFilters.cdaCm.indexOf(n.cdaCm) !== -1);
  //   }

  //   let filter4 = filter3;
  //   if (this.selectedFilters.clinicalRiskManager && this.selectedFilters.clinicalRiskManager.length > 0) {
  //     filter4 = null;
  //     filter4 = filter3.filter((n: any) => this.selectedFilters.clinicalRiskManager.indexOf(n.clinicalRiskManager) !== -1);
  //   }

  //   let filter5 = filter4;
  //   if (this.selectedFilters.centeralMonitoringStatus && this.selectedFilters.centeralMonitoringStatus.length > 0) {
  //     filter5 = null;
  //     filter5 = filter4.filter((n: any) => this.selectedFilters.centeralMonitoringStatus.indexOf(n.centralMonitoringStatus) !== -1);
  //   }

  //   // if (this.selectedFilters) {
  //   //   let filter1 = recs;
  //   //   if (this.selectedFilters.region && this.selectedFilters.region.length > 0) {
  //   //     filter1 = null;
  //   //     filter1 = recs.filter((n: any) => this.selectedFilters.region.indexOf(n.region) !== -1);
  //   //   }

  //   //   let filter2 = filter1;
  //   //   if (this.selectedFilters.portfolio && this.selectedFilters.portfolio.length > 0) {
  //   //     filter2 = null;
  //   //     filter2 = filter1.filter((n: any) => this.selectedFilters.portfolio.indexOf(n.portfolio) !== -1);
  //   //   }

  //   //   let filter3 = filter2;
  //   //   if (this.selectedFilters.dmpm && this.selectedFilters.dmpm.length > 0) {
  //   //     filter3 = null;
  //   //     filter3 = filter2.filter((n: any) => this.selectedFilters.dmpm.some((v: any) => n.currentDmpm?.includes(v)));
  //   //   }

  //   //   let filter4 = filter3;
  //   //   if (this.selectedFilters.cdms && this.selectedFilters.cdms.length > 0) {
  //   //     filter4 = null;
  //   //     filter4 = filter3.filter((n: any) => this.selectedFilters.cdms.indexOf(n.cdms) !== -1);
  //   //   }
  //   //this.recordCount =filter5?.length;
  //   return filter5;
  // }

  // get recordCount() {
  //   return this.filteredRecords?.length;
  // }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
    this.loadReport();
  }

  async onRaiseEvent(value: any) {
    let id = value?.actionValue;
    
    await this.studyEditService.setStudyIdAndLoadProperties(id);

    await this.router.navigate(['/study']); 
    
    
  }

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Icon Number',
      field: 'studyIconNumber',
      actionType: 'raise-event',
      actionField: 'studyId'
    },

    {
      header: 'Sponsor Study Number',
      field: 'sponsorStudyNumber',
      width: 30
    },

    {
      header: 'Sponsor',
      field: 'derivedSponsor'
    },

    {
      header: 'CDA/CM',
      field: 'cdaCm'
    },
    {
      header: 'Clinical Risk Manager',
      field: 'clinicalRiskManager',
      width: 50
    },
    {
      header: 'Central Monitoring Status',
      field: 'centralMonitoringStatus'
    },
    {
      header: 'First Analysis Date',
      field: 'firstAnalysisDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Final Analysis Date',
      field: 'finalAnalysisDate',
      type: 'date',
      format: 'dd-MMM-yyyy',
      align: 'center'
    },
    {
      header: 'Analysis Frequency',
      field: 'analysisFrequencyDerived',
      width: 50
    },
    {
      header: 'Total Forecasted CDA Analysis',
      field: 'totalScheduleCdaAnalysis',
      width: 50
    },
    {
      header: 'Total Actual CDA Analysis',
      field: 'totalActualCdaAnalysis',
      width: 50
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
