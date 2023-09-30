import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { ReportsRoutingModule } from '@app/prism/reports/reports-routing.module';
import { ProjectReviewComplianceComponent } from '@app/prism/reports/compliance/project-review-compliance/project-review-compliance.component';

import { ProjectReviewComplianceListComponent } from '@app/prism/reports/compliance/project-review-compliance/project-review-compliance-list/project-review-compliance-list.component';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
//for used of filter comp in shell:
import { ImiRaDevReqGroupModule } from '@app/prism/imi-ra-trackers/imi-ra-dev-req-group/imi-ra-dev-req-group.module';
//for used of filter comp in shell:
import { ImiRaOutputReqGroupModule } from '@app/prism/imi-ra-trackers/imi-ra-output-req-group/imi-ra-output-req-group.module';
//Prism\ClientApp\src\app\prism\imi-ra-trackers\imi-ra-dev-req-group\imi-ra-dev-req-group.module.ts

import { OmrReportComponent } from './study/omr-report/omr-report.component';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { ReportBaseComponent } from './report-base/report-base.component';
import { ReportShellComponent } from './report-shell/report-shell.component';

// import { FilterOneComponent } from '@app/prism/reports/filters/filter-one/filter-one.component';
import { FilterOneComponent } from '@app/prism/reports/filter-shell/filter-one/filter-one.component';

// import { FilterTwoComponent } from '@app/prism/reports/filters/filter-two/filter-two.component';
import { FilterTwoComponent } from '@app/prism/reports/filter-shell/filter-two/filter-two.component';

import { EDCExperienceByStudyPhaseComponent } from './study/edcexperience-by-study-phase/edcexperience-by-study-phase.component';

// import { FilterThreeComponent } from './filters/filter-three/filter-three.component';
import { FilterThreeComponent } from '@app/prism/reports/filter-shell/filter-three/filter-three.component';

// import { EDCExperienceFilterComponent } from './filters/edc-experience-filter/edc-experience-filter-component';
import { EDCExperienceFilterComponent } from '@app/prism/reports/filter-shell/edc-experience-filter/edc-experience-filter-component';

import { EdcstudystatusBySystemComponent } from './study/edcstudystatus-by-system/edcstudystatus-by-system.component';

import { DmStudyOwnerListFilterShellComponent } from '@app/prism/reports/filter-shell/dm-study-owner-list-filter/dm-study-owner-list-filter.component';
// import { ProjectReviewFilterShellComponent }
// from '@app/prism/reports/filter-shell/project-review-filter-shell/project-review-filter-shell.component';

import { MissingFormsAndOfflineValidationsComponent } from '@app/prism/reports/compliance/missing-forms-and-offline-validations/missing-forms-and-offline-validations.component';
import { MissingFormsListComponent } from '@app/prism/reports/compliance/missing-forms-list/missing-forms-list.component';
import { OfflineValidationsListComponent } from '@app/prism/reports/compliance/offline-validations-list/offline-validations-list.component';
import { RegPortDirCdmsDmpmFilterShellComponent } from './filter-shell/reg-port-dir-cdms-dmpm-filter-shell/reg-port-dir-cdms-dmpm-filter-shell.component';
import { ExternalDataReportFilterShellComponent } from './filter-shell/external-data-report-filter-shell/external-data-report-filter-shell.component';
import { StudyDblSummaryFilterShellComponent } from './filter-shell/study-dbl-summary-filter-shell/study-dbl-summary-filter-shell.component';
import { CelgeneDeliverablesFilterShellComponent } from './filter-shell/celgene-deliverables-filter-shell/celgene-deliverables-filter-shell.component';
import { ProjectReviewReportComponent } from './study/project-review-report/project-review-report.component';
import { DmCommonFiltersTypeAShellComponent } from './filter-shell-s/dm-common-filters-type-a-shell/dm-common-filters-type-a-shell.component';
import { ComplianceOfflineValidationRepComponent } from './compliance/compliance-offline-validation-rep/compliance-offline-validation-rep.component';
import { CdsDevFilterShellComponent } from './filter-shell-s/cds/cds-dev-filter-shell/cds-dev-filter-shell.component';
import { CdsOutFilterShellComponent } from './filter-shell-s/cds/cds-out-filter-shell/cds-out-filter-shell.component';
import { CdsDelyFilterShellComponent } from './filter-shell-s/cds/cds-dely-filter-shell/cds-dely-filter-shell.component';
import { CdsValFilterShellComponent } from './filter-shell-s/cds/cds-val-filter-shell/cds-val-filter-shell.component';
import { CdsCodFilterShellComponent } from './filter-shell-s/cds/cds-cod-filter-shell/cds-cod-filter-shell.component';
import { CdsInstFilterShellComponent } from './filter-shell-s/cds/cds-inst-filter-shell/cds-inst-filter-shell.component';
import { CdmsTrackerFilterShellComponent } from './filter-shell/cdms-tracker-filter-shell/cdms-tracker-filter-shell.component';
import { CdmsTrGrpFilterShellComponent } from './filter-shell/cdms-tr-grp-filter-shell/cdms-tr-grp-filter-shell.component';
import { CdmsTaskListFilterShellComponent } from './filter-shell-s/cdms/cdms-task-list-filter-shell/cdms-task-list-filter-shell.component';
import { CdmsTaskGroupFilterShellComponent } from './filter-shell-s/cdms/cdms-task-group-filter-shell/cdms-task-group-filter-shell.component';
import { ImiStudyReviewReportComponent } from './imi-study/imi-study-review-report/imi-study-review-report.component';
import { ImiReviewReportFiltersComponent } from './imi-study/filters/imi-review-report-filters/imi-review-report-filters.component';
import { ImiCdmsFilterShellComponent } from './filter-shell/imi-common-filter-shell/imi-common-filter-shell.component';
import { ImiDmCdmsFilterShellComponent } from './filter-shell/imi-dm-cdms-filter-shell/imi-dm-cdms-filter-shell.component';
import { ImiCdmsTaskListFilterShellComponent } from './filter-shell-s/imi/imi-cdms-task-list-filter-shell/imi-cdms-task-list-filter-shell.component';
import { ImiTimelineFilterShellComponent } from './filter-shell/imi-timeline-filter-shell/imi-timeline-filter-shell.component';
import { FilterShellNotAvailableComponent } from './filter-shell-not-available/filter-shell-not-available.component';
import { FilterShellSNotAvailableComponent } from './filter-shell-s-not-available/filter-shell-s-not-available.component';
import { ImiRevReadPerfFilterShellComponent } from './filter-shell-s/imi/imi-rev-read-perf-filter-shell/imi-rev-read-perf-filter-shell.component';
import { ImiReviewComplianceComponent } from './imi-compliance/imi-review-compiance/imi-review-compliance/imi-review-compliance.component';
import { ImiReviewComplianceFiltersComponent } from './imi-compliance/imi-review-compliance-filters/imi-review-compliance-filters.component';
import { ImiProjRevCompListComponent } from './imi-compliance/imi-review-compiance/imi-proj-rev-comp-list/imi-proj-rev-comp-list.component';
import { ImiCdmsTaskGrpFilterShellComponent } from './filter-shell-s/imi/imi-cdms-task-grp-filter-shell/imi-cdms-task-grp-filter-shell.component';
import { ImiRevIssueTrackerFilterShellComponent } from './filter-shell/imi-rev-issue-tracker-filter-shell/imi-rev-issue-tracker-filter-shell.component';
import { ImiRaDevReqFiltersShellComponent } from './filter-shell-s/imi/imi-ra-dev-req-filters-shell/imi-ra-dev-req-filters-shell.component';
import { ImiRaOutReqFiltersShellComponent } from './filter-shell-s/imi/imi-ra-out-req-filters-shell/imi-ra-out-req-filters-shell.component';
import { DmExportsComponent } from './exports/dm-exports/dm-exports.component';
import { ThirdPartyCdmsTaskGroupFilterShellComponent } from './filter-shell-s/cdms/third-party-cdms-task-group-filter-shell/third-party-cdms-task-group-filter-shell.component';
import { ThirdPartyCdmsTaskListFilterShellComponent } from './filter-shell-s/cdms/third-party-cdms-task-list-filter-shell/third-party-cdms-task-list-filter-shell.component';
import { CdsExportsComponent } from './exports/cds-exports/cds-exports.component';
import { CdmsExportsComponent } from './exports/cdms-exports/cdms-exports.component';
import { ImiExportsComponent } from './exports/imi-exports/imi-exports.component';
import { FteDashboardReportComponent } from './study/fte-dashboard-rep/fte-dashboard-report/fte-dashboard-report.component';
import { FteDashboardFiltersComponent } from './study/fte-dashboard-rep/fte-dashboard-filters/fte-dashboard-filters.component';
import { DmIconNumberFilterShellComponent } from './filter-shell/dm-icon-number-filter-shell/dm-icon-number-filter-shell.component';
import { DmIconNumberSponsorFilterShellComponent } from './filter-shell/dm-icon-number-sponsor-filter-shell/dm-icon-number-sponsor-filter-shell.component';
import { Report1Component } from './crm/report1/report1.component';
import { CrmExportsComponent } from './crm/crm-exports/crm-exports.component';
import { Report2Component } from './crm/report2/report2.component';
import { UserReportComponent } from './user/user-report/user-report.component';
@NgModule({
  declarations: [
    ProjectReviewComplianceComponent,
    ProjectReviewComplianceListComponent,
    OmrReportComponent,
    ReportBaseComponent,
    ReportShellComponent,
    EDCExperienceByStudyPhaseComponent,
    FilterThreeComponent,
    EDCExperienceFilterComponent,
    EdcstudystatusBySystemComponent,
    DmStudyOwnerListFilterShellComponent,
    // ProjectReviewFilterShellComponent,
    MissingFormsAndOfflineValidationsComponent,
    MissingFormsListComponent,
    OfflineValidationsListComponent,
    RegPortDirCdmsDmpmFilterShellComponent,
    ExternalDataReportFilterShellComponent,
    StudyDblSummaryFilterShellComponent,
    CelgeneDeliverablesFilterShellComponent,
    ProjectReviewReportComponent,
    DmCommonFiltersTypeAShellComponent,
    ComplianceOfflineValidationRepComponent,
    CdsDevFilterShellComponent,
    CdsOutFilterShellComponent,
    CdsDelyFilterShellComponent,
    CdsValFilterShellComponent,
    CdsCodFilterShellComponent,
    CdsInstFilterShellComponent,
    CdmsTrackerFilterShellComponent,
    CdmsTrGrpFilterShellComponent,
    CdmsTaskListFilterShellComponent,
    CdmsTaskGroupFilterShellComponent,
    ImiStudyReviewReportComponent,
    ImiReviewReportFiltersComponent,
    ImiCdmsFilterShellComponent,
    ImiDmCdmsFilterShellComponent,
    ImiCdmsTaskListFilterShellComponent,
    ImiTimelineFilterShellComponent,
    FilterShellNotAvailableComponent,
    FilterShellSNotAvailableComponent,
    ImiRevReadPerfFilterShellComponent,
    ImiReviewComplianceComponent,
    ImiReviewComplianceFiltersComponent,
    ImiProjRevCompListComponent,
    ImiCdmsTaskGrpFilterShellComponent,
    ImiRevIssueTrackerFilterShellComponent,
    ImiRaDevReqFiltersShellComponent,
    ImiRaOutReqFiltersShellComponent,
    DmExportsComponent,
    ThirdPartyCdmsTaskGroupFilterShellComponent,
    ThirdPartyCdmsTaskListFilterShellComponent,
    CdsExportsComponent,
    CdmsExportsComponent,
    ImiExportsComponent,
    FteDashboardReportComponent,
    FteDashboardFiltersComponent,
    DmIconNumberFilterShellComponent,
    DmIconNumberSponsorFilterShellComponent,
    Report1Component,
    CrmExportsComponent,
    Report2Component,
    UserReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    SharedCompsModule,
    GuiGridModule,
    ImiRaDevReqGroupModule,
    ImiRaOutputReqGroupModule
  ],
  entryComponents: [
    ProjectReviewComplianceComponent,
    FilterOneComponent,
    FilterTwoComponent,
    FilterThreeComponent,
    DmStudyOwnerListFilterShellComponent,
    // ProjectReviewFilterShellComponent,
    ExternalDataReportFilterShellComponent,
    StudyDblSummaryFilterShellComponent,
    CelgeneDeliverablesFilterShellComponent,
    DmCommonFiltersTypeAShellComponent,
    CdsDevFilterShellComponent,
    CdsOutFilterShellComponent,
    CdsDelyFilterShellComponent,
    CdsValFilterShellComponent,
    CdsCodFilterShellComponent,
    CdsInstFilterShellComponent,
    CdmsTrGrpFilterShellComponent,
    CdmsTaskListFilterShellComponent,
    CdmsTaskGroupFilterShellComponent,
    ImiCdmsFilterShellComponent,
    ImiDmCdmsFilterShellComponent,
    ImiCdmsTaskListFilterShellComponent,
    ImiTimelineFilterShellComponent,
    ImiRevReadPerfFilterShellComponent,
    ImiCdmsTaskGrpFilterShellComponent,
    ImiRevIssueTrackerFilterShellComponent,
    ImiRaDevReqFiltersShellComponent,
    ImiRaOutReqFiltersShellComponent,
    ThirdPartyCdmsTaskGroupFilterShellComponent,
    ThirdPartyCdmsTaskListFilterShellComponent,
    DmIconNumberFilterShellComponent,
    DmIconNumberSponsorFilterShellComponent
  ]
})
export class ReportsModule {}
