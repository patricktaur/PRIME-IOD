import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectReviewComplianceComponent } from '@app/prism/reports/compliance/project-review-compliance/project-review-compliance.component';
import { OmrReportComponent } from '@app/prism/reports/study/omr-report/omr-report.component';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import { ReportShellComponent } from '@app/prism/reports/report-shell/report-shell.component';
import { DataTableShellComponent } from '@app/shared/data-table/data-table-shell/data-table-shell.component';
import { DataTableShellNDynamicFiltersComponent } from '@app/prism/reports/data-table-shell-n-dynamic-filters/data-table-shell-n-dynamic-filters.component';
import { EDCExperienceByStudyPhaseComponent } from '@app/prism/reports/study/edcexperience-by-study-phase/edcexperience-by-study-phase.component';
import { EdcstudystatusBySystemComponent } from '@app/prism/reports/study/edcstudystatus-by-system/edcstudystatus-by-system.component';
import { MissingFormsAndOfflineValidationsComponent } from '@app/prism/reports/compliance/missing-forms-and-offline-validations/missing-forms-and-offline-validations.component';
import { ProjectReviewReportComponent } from '@app/prism/reports/study/project-review-report/project-review-report.component';
import { ReportServerSideFilterNPaginationComponent } from '@app/prism/shared-comps/report-server-side-filter-n-pagination/report-server-side-filter-n-pagination.component';
import { ComplianceOfflineValidationRepComponent } from '@app/prism/reports/compliance/compliance-offline-validation-rep/compliance-offline-validation-rep.component';
import { ImiStudyReviewReportComponent } from './imi-study/imi-study-review-report/imi-study-review-report.component';
import { ImiReviewComplianceComponent } from '@app/prism/reports/imi-compliance/imi-review-compiance/imi-review-compliance/imi-review-compliance.component';
import { DmExportsComponent } from '@app/prism/reports/exports/dm-exports/dm-exports.component';
import { CdsExportsComponent } from '@app/prism/reports/exports/cds-exports/cds-exports.component';
import { CdmsExportsComponent } from '@app/prism/reports/exports/cdms-exports/cdms-exports.component';
import { ImiExportsComponent } from '@app/prism/reports/exports/imi-exports/imi-exports.component';
import { DmProcImpTrackerReportComponent } from '@app/prism/process-improvement-trackers/dm-process-improvement-tracker/dm-proc-imp-tracker-report/dm-proc-imp-tracker-report.component';
import { FteDashboardReportComponent } from './study/fte-dashboard-rep/fte-dashboard-report/fte-dashboard-report.component';
import { Report1Component } from './crm/report1/report1.component';
import { CrmExportsComponent } from './crm/crm-exports/crm-exports.component';
import { Report2Component } from './crm/report2/report2.component';
import { UserReportComponent } from './user/user-report/user-report.component';
const routes: Routes = [
  {
    path: 'project-review-compliance',
    component: ProjectReviewComplianceComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'Review Compliance Report' }
  },
  {
    path: 'missing-forms-and-offline-validations',
    component: MissingFormsAndOfflineValidationsComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'XXXXXXX' }
  },
  {
    path: 'offline-validation-rep',
    component: ComplianceOfflineValidationRepComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'XXXXXXX' }
  },
  {
    path: 'omr-report',
    component: OmrReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'OMR Report' }
  },
  {
    path: 'project-review-report',
    component: ProjectReviewReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'Project Review Report' }
  },
  {
    path: 'report-viewer-1',
    component: DataTableShellComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'Report Test - 1' }
  },

  {
    path: 'report-n-dynamic-filters',
    component: DataTableShellNDynamicFiltersComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'Dynamic Filters' }
  },

  {
    path: 'report-s',
    component: ReportServerSideFilterNPaginationComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'Report Server Side Filters' }
  },

  {
    path: 'edc-experience-by-study-phase-report',
    component: EDCExperienceByStudyPhaseComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'EDC Experience By Study Phase' }
  },
  {
    path: 'edc-study-status-by-system',
    component: EdcstudystatusBySystemComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'EDC Study Status By System' }
  },

  {
    path: 'fte-dashboard-report',
    component: FteDashboardReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },

  {
    path: 'imi-study-review-report',
    component: ImiStudyReviewReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'IMI Study Review Report' }
  },

  {
    path: 'imi-review-compliance',
    component: ImiReviewComplianceComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'Review Compliance Report' }
  },

  {
    path: 'dm-exports',
    component: DmExportsComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'cds-exports',
    component: CdsExportsComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'cdms-exports',
    component: CdmsExportsComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'imi-exports',
    component: ImiExportsComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'dm-process-improvement-tracker',
    component: DmProcImpTrackerReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'dm-process-improvement-tracker',
    component: DmProcImpTrackerReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'crm-report1',
    component: Report1Component,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  {
    path: 'crm-report2',
    component: Report2Component,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports' }
  },
  
  {
    path: 'crm-export',
    component: CrmExportsComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'DM - Exports'
   },
   {
    path: 'user-report',
    component: UserReportComponent,
    canActivate: [AuthenticationGuard]
    // data: { permission: 'rol.*, res.*', name: 'EDC Experience By Study Phase' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
