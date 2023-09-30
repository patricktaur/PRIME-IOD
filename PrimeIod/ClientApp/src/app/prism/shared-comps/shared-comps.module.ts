import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { DMCommonFilterComponent } from '@app/prism/shared-comps/filters/dm-common-filters/dm-common-filters.component';
import { DMCommonFilterTypeAComponent } from '@app/prism/shared-comps/filters/dm-common-filters-type-a/dm-common-filters-type-a.component';

import { StudyReviewFilterComponent } from './study-review-filter/study-review-filter.component';
import { ReportDownloadComponent } from './report-download/report-download.component';
import { ReportDownloadServerSideFiltersComponent } from './report-download-server-side-filters/report-download-server-side-filters.component';
import { DataTableShellNDynamicFiltersComponent } from '@app/prism/reports/data-table-shell-n-dynamic-filters/data-table-shell-n-dynamic-filters.component';
import { StudyFilterShellComponent } from './study-filter-shell/study-filter-shell.component';
import { RegionFilterComponent } from './filter-components/region-filter/region-filter.component';
import { DropDownValueFilterComponent } from './filter-components/drop-down-value-filter/drop-down-value-filter.component';
import { DropDownIdFilterComponent } from './filter-components/drop-down-id-filter/drop-down-id-filter.component';
import { SponsorFilterComponent } from './filter-components/sponsor-filter/sponsor-filter.component';
import { RegionImiFilterComponent } from './filter-components/region-imi-filter/region-imi-filter.component';
import { SponsorImiFilterComponent } from './filter-components/sponsor-imi-filter/sponsor-imi-filter.component';
import { DmStudyOwnerListFilterComponent } from './filters/dm-study-owner-list-filter/dm-study-owner-list-filter.component';
// import { ProjectReviewFilterComponent } from './filters/project-review-filter/project-review-filters.component';
import { RegionPortfolioDmpmCdmsFilterComponent } from './filters/region-portfolio-dmpm-cdms-filter/region-portfolio-dmpm-cdms-filter.component';
import { RegionPortfolioDirectorCdmsDmpmFilterComponent } from './filters/region-portfolio-director-cdms-dmpm-filter/region-portfolio-director-cdms-dmpm-filter.component';
import { ReportDownloadJson2CsvComponent } from '@app/prism/shared-comps/report-download-json-2-csv/report-download-json-2-csv.component';
import { ExternalDataReportFilterComponent } from './filters/external-data-report-filter/external-data-report-filter.component';
// import { StudyDblSummaryFilterComponent } from './filters/study-dbl-summary-filter/study-dbl-summary-filter.component';
import { StudyDblSummaryFilterComponent } from '@app/prism/shared-comps/filters/study-dbl-summary-filter/study-dbl-summary-filter.component';
// import { CelgeneDeliverablesFilterComponent } from './filters/celgene-deliverables-filter/celgene-deliverables-filter.component';

import { CelgeneDeliverablesFilterComponent } from '@app/prism/shared-comps/filters/celgene-deliverables-filter/celgene-deliverables-filter.component';
import { ProjectReviewFilterComponent } from './filters/project-review-filter/project-review-filter.component';
import { ReportServerSideFilterNPaginationComponent } from './report-server-side-filter-n-pagination/report-server-side-filter-n-pagination.component';
import { ReportFilterSShellComponent } from './report-filter-s-shell/report-filter-s-shell.component';
import { StudyListBaseComponent } from './study-list-edit/study-list-base/study-list-base.component';
import { DmResourcesSFilterComponent } from './filters/dm/sever-side/dm-resources-s-filter/dm-resources-s-filter.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserViewSelectComponent } from './user/user-view-select/user-view-select.component';
import { ParamViewComponent } from './param-view/param-view.component';

import { CdsCodingFilterComponent } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-coding-filter/cds-coding-filter.component';
import { CdsValidationFilterComponent } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-validation-filter/cds-validation-filter.component';
import { CdsDeliveryFilterComponent } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-delivery-filter/cds-delivery-filter.component';
import { CdsInstructionsFilterComponent } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-instructions-filter/cds-instructions-filter.component';
import { CdsOutputFilterComponent } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-filter/cds-output-filter.component';
import { CdsDevelopmentFilterComponent } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-development-filter/cds-development-filter.component';
import { CdmsTrackerFilterComponent } from './filters/cdms/cdms-tracker-filter/cdms-tracker-filter.component';
import { CdmsTrackerGroupFilterComponent } from './filters/cdms/cdms-tracker-group-filter/cdms-tracker-group-filter.component';
import { CdmsTrackerSFilterComponent } from './filters/cdms/cdms-tracker-s-filter/cdms-tracker-s-filter.component';
import { CdmsTrackerGroupSFilterComponent } from './filters/cdms/cdms-tracker-group-s-filter/cdms-tracker-group-s-filter.component';
import { ImiResourcesSFilterComponent } from './filters/dm/sever-side/imi-resources-s-filter/imi-resources-s-filter.component';
import { ImiCdmsFilterComponent } from './filters/imi-common-filters/imi-common-filter/imi-cdms-filter.component';
import { ImiDmCdmsFiltersComponent } from './filters/imi-common-filters/imi-dm-cdms-filters/imi-dm-cdms-filters.component';
import { ImiCdmsTrackerSFilterComponent } from './filters/imi-common-filters/imi-cdms-tracker-s-filter/imi-cdms-tracker-s-filter.component';
import { ImiTimelineFilterComponent } from './filters/imi-common-filters/imi-timeline-filter/imi-timeline-filter.component';
import { ImiReviewReaderPeforFilterComponent } from './filters/imi-common-filters/imi-review-reader-pefor-filter/imi-review-reader-pefor-filter.component';
import { ImiCdmsTrackerGroupSFilterComponent } from './filters/imi-common-filters/imi-cdms-tracker-group-s-filter/imi-cdms-tracker-group-s-filter.component';
import { ImiRevIssueTrackerFilterComponent } from './filters/imi-common-filters/imi-rev-issue-tracker-filter/imi-rev-issue-tracker-filter.component';
import { ThirdPartyCdmsTaskGroupSFilterComponent } from './filters/cdms/third-party-cdms-task-group-s-filter/third-party-cdms-task-group-s-filter.component';
import { ThirdPartyCdmsTaskListSFilterComponent } from './filters/cdms/third-party-cdms-task-list-s-filter/third-party-cdms-task-list-s-filter.component';
import { DmIconNumberFilterComponent } from './filters/dm/client-side/dm-icon-number-filter/dm-icon-number-filter.component';
import { DmIconNumberSponsorFilterComponent } from './filters/dm/client-side/dm-icon-number-sponsor-filter/dm-icon-number-sponsor-filter.component';
import { StudyMenuAccessLinkDirective } from './study-access/study-menu-access-link.directive';
import { StudyResourcesComponent } from './study-resources/study-resources.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    DMCommonFilterComponent,
    DMCommonFilterTypeAComponent,
    StudyReviewFilterComponent,
    ReportDownloadComponent,
    ReportDownloadServerSideFiltersComponent,
    StudyFilterShellComponent,
    DataTableShellNDynamicFiltersComponent,
    RegionFilterComponent,
    DropDownValueFilterComponent,
    DropDownIdFilterComponent,
    SponsorFilterComponent,
    RegionImiFilterComponent,
    SponsorImiFilterComponent,
    DmStudyOwnerListFilterComponent,
    RegionPortfolioDmpmCdmsFilterComponent,
    RegionPortfolioDirectorCdmsDmpmFilterComponent,
    ReportDownloadJson2CsvComponent,
    ExternalDataReportFilterComponent,
    StudyDblSummaryFilterComponent,
    CelgeneDeliverablesFilterComponent,
    ProjectReviewFilterComponent,
    ReportServerSideFilterNPaginationComponent,
    ReportFilterSShellComponent,
    StudyListBaseComponent,
    DmResourcesSFilterComponent,
    UserViewComponent,
    UserViewSelectComponent,
    ParamViewComponent,
    CdsCodingFilterComponent,
    CdsDeliveryFilterComponent,
    CdsDevelopmentFilterComponent,
    CdsInstructionsFilterComponent,
    CdsOutputFilterComponent,
    CdsValidationFilterComponent,
    CdmsTrackerFilterComponent,
    CdmsTrackerGroupFilterComponent,
    CdmsTrackerSFilterComponent,
    CdmsTrackerGroupSFilterComponent,
    ImiResourcesSFilterComponent,
    ImiCdmsFilterComponent,
    ImiDmCdmsFiltersComponent,
    ImiCdmsTrackerSFilterComponent,
    ImiTimelineFilterComponent,
    ImiReviewReaderPeforFilterComponent,
    ImiCdmsTrackerGroupSFilterComponent,
    ImiRevIssueTrackerFilterComponent,
    ThirdPartyCdmsTaskGroupSFilterComponent,
    ThirdPartyCdmsTaskListSFilterComponent,
    DmIconNumberFilterComponent,
    DmIconNumberSponsorFilterComponent,
    StudyMenuAccessLinkDirective,
    StudyResourcesComponent,
    UserRolesComponent,
    AlertComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    DMCommonFilterComponent,
    DMCommonFilterTypeAComponent,
    StudyReviewFilterComponent,
    ReportDownloadComponent,
    ReportDownloadServerSideFiltersComponent,
    StudyFilterShellComponent,
    RegionFilterComponent,
    SponsorFilterComponent,
    DropDownValueFilterComponent,
    RegionImiFilterComponent,
    SponsorImiFilterComponent,
    DmStudyOwnerListFilterComponent,
    RegionPortfolioDmpmCdmsFilterComponent,
    RegionPortfolioDirectorCdmsDmpmFilterComponent,
    ReportDownloadJson2CsvComponent,
    ExternalDataReportFilterComponent,
    StudyDblSummaryFilterComponent,
    CelgeneDeliverablesFilterComponent,
    ProjectReviewFilterComponent,
    ReportFilterSShellComponent,
    StudyListBaseComponent,
    DmResourcesSFilterComponent,
    UserViewComponent,
    UserViewSelectComponent,
    ParamViewComponent,
    CdsCodingFilterComponent,
    CdsDeliveryFilterComponent,
    CdsDevelopmentFilterComponent,
    CdsInstructionsFilterComponent,
    CdsOutputFilterComponent,
    CdsValidationFilterComponent,
    CdmsTrackerFilterComponent,
    CdmsTrackerGroupFilterComponent,
    CdmsTrackerSFilterComponent,
    CdmsTrackerGroupSFilterComponent,
    ImiResourcesSFilterComponent,
    ImiCdmsFilterComponent,
    ImiDmCdmsFiltersComponent,
    ImiCdmsTrackerSFilterComponent,
    ImiTimelineFilterComponent,
    ImiReviewReaderPeforFilterComponent,
    ImiCdmsTrackerGroupSFilterComponent,
    ImiRevIssueTrackerFilterComponent,
    ThirdPartyCdmsTaskGroupSFilterComponent,
    ThirdPartyCdmsTaskListSFilterComponent,
    DmIconNumberFilterComponent,
    DmIconNumberSponsorFilterComponent,
    StudyMenuAccessLinkDirective,
    StudyResourcesComponent,
    UserRolesComponent,
    AlertComponent
  ]
})
export class SharedCompsModule {}
