import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
// import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { QualityGroupContainerComponent } from './quality-group-container/quality-group-container.component';
import { StudyKpiComponent } from '@app/prism/study/study-tabs/quality-group/study-kpi/study-kpi.component';
import { StudyKpiDashboardComponent } from '@app/prism/study/study-tabs/quality-group/study-kpi-dashboard/study-kpi-dashboard.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';
import { StudyKpiViewComponent } from './study-kpi-view/study-kpi-view.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyKpiDashboardViewComponent } from './study-kpi-dashboard-view/study-kpi-dashboard-view.component';

const routes: Routes = [
  {
    path: '',
    component: QualityGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'quality-review'
      },

      {
        path: 'quality-review',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-quality-review/study-quality-review.module').then(
            m => m.StudyQualityReviewModule
          ),
          canActivate: [PermissionGuard]
      },

      {
        path: 'quality-review-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-quality-review/study-quality-review.module').then(
            m => m.StudyQualityReviewModule
        ),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'kpis',
        component: StudyKpiComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [ StudyEditGuard ],
        // data: { compCode: 'study-kpis', redirectUrl: 'kpis-view' }
      },
      {
        path: 'kpis-view',
        component: StudyKpiViewComponent
      },
      {
        path: 'kpi-dashboard',
        component: StudyKpiDashboardComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [ StudyEditGuard ],
        // data: { compCode: 'study-kpi-dashboard', redirectUrl: 'kpi-dashboard-view' }
      },
      {
        path: 'kpi-dashboard-view',
        component: StudyKpiDashboardViewComponent
      },
      {
        path: 'edc-user-access',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/quality-group/study-edc-access-review-periodicity/study-edc-access-review-periodicity.module'
          ).then(m => m.StudyEdcAccessReviewPeriodicityModule),
        // canActivate: [ StudyEditGuard ],
        // data: { compCode: 'study-edc-access-edit', redirectUrl: 'edc-user-access-view' }
      },
      {
        path: 'edc-user-access-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/quality-group/study-edc-access-review-periodicity/study-edc-access-review-periodicity.module'
          ).then(m => m.StudyEdcAccessReviewPeriodicityModule),
        data: {
          mode: 'view'
        }
      },
      {
        path: 'tmf-qc',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/quality-group/study-tmf-qc/study-tmf-qc.module').then(
            m => m.StudyTmfQcModule
          ),
        // canActivate: [ StudyEditGuard ],
        // data: { compCode: 'study-tmf-qc-edit', redirectUrl: 'tmf-qc-view' }
      },
      {
        path: 'tmf-qc-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/quality-group/study-tmf-qc/study-tmf-qc.module').then(
            m => m.StudyTmfQcModule
          ),
        data: {
          mode: 'view'
        }
      },
      {
        path: 'sftp-user-access',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/quality-group/study-sftp-user-access-review/study-sftp-user-access-review.module'
          ).then(m => m.StudySFtpUserAccessReviewModule),
        // canActivate: [ StudyEditGuard ],
        // data: { compCode: 'study-edc-access-edit', redirectUrl: 'edc-user-access-view' }
      },
      {
        path: 'sftp-user-access-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/quality-group/study-sftp-user-access-review/study-sftp-user-access-review.module'
          ).then(m => m.StudySFtpUserAccessReviewModule),
        data: {
          mode: 'view'
        }
      },
      {
        path: 'audit-trail-review',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/quality-group/study-audit-trail-review/study-audit-trail-review.module'
          ).then(m => m.StudyAuditTrailReviewModule),
        // canActivate: [ StudyEditGuard ],
        // data: { compCode: 'study-edc-access-edit', redirectUrl: 'edc-user-access-view' }
      },
      {
        path: 'audit-trail-review-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/quality-group/study-audit-trail-review/study-audit-trail-review.module'
          ).then(m => m.StudyAuditTrailReviewModule),
        data: {
          mode: 'view'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityGroupRoutingModule {}
