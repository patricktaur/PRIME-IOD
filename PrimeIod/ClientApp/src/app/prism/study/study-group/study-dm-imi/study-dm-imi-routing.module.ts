import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { StudyDmImiContainerComponent } from './study-imi-container/study-imi-container.component';
import { StudyDmImiContainerComponent } from '@app/prism/study/study-group/study-dm-imi/study-dm-imi-container/study-dm-imi-container.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { StudyLocalLabsComponent } from '@app/prism/study/study-tabs/study-local-labs/study-local-labs.component';
import { DatabaseLockDashboardFollowupDblComponent } from '@app/prism/study/study-tabs/database-lock-dashboard-followup-dbl/database-lock-dashboard-followup-dbl.component';
// import { OfflineChecksComponent } from '@app/prism/study/study-review-tabs/study-review/study-offline-checks/offline-checks.component';
import { StudyInfoComponent } from '@app/prism/study/study-info/study-info.component';
import { FteComputationsComponent } from '@app/prism/study/study-tabs/study-fte-computations/fte-computations.component';
import { StudyOfflineIgnoreComponent } from '@app/prism/study/study-review-tabs/study-review/study-offline-ignore/study-offline-ignore.component';
import { ImiStudyStatusComponent } from '@app/prism/study/imi-tabs/imi-study-status/imi-study-status.component';
import { ImiStudyTimelinesComponent } from '@app/prism/study/imi-tabs/imi-study-timelines/imi-study-timelines.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyLocalLabsViewComponent } from '../../study-tabs/study-local-labs-view/study-local-labs-view.component';
import { ImiStudyTimelinesViewComponent } from '../../imi-tabs/imi-study-timelines-view/imi-study-timelines-view.component';
import { ImiStudyStatusViewComponent } from '../../imi-tabs/imi-study-status-view/imi-study-status-view.component';
import { DatabaseLockDashboardMainDblComponent } from '../../study-tabs/database-lock-dashboard-main-dbl/database-lock-dashboard-main-dbl.component';
import { DatabaseLockDashboardMainDblViewComponent } from '../../study-tabs/database-lock-dashboard-main-dbl-view/database-lock-dashboard-main-dbl-view.component';
import { NoPermissionComponent } from '../../no-permission/no-permission.component';
import { StudyEditComponent } from '../../study-tabs/study-edit/study-edit.component';

const routes: Routes = [
  {
    path: '',
    component: StudyDmImiContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'description-assumptions'
      },
      {
        path: 'study-edit',
        component: StudyEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
      },
      {
        path: 'review',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-review/study-review.module').then(m => m.StudyReviewModule),
          canActivate: [PermissionGuard],
          data: {  parentPath: 'study/dm-imi', debugMode: true},

      },
      {
        path: 'description-assumptions',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-details-container/study-details-container.module').then(
            m => m.StudyDetailsContainerModule
          )
      },

      {
        path: 'resources-group',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-resources-group/study-resources-group.module').then(
            m => m.StudyResourcesGroupModule
          )
      },

      {
        path: 'timeline',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-timeline/study-timeline.module').then(
            m => m.StudyTimelineModule
          )
      },

      {
        path: 'status-pageflow',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-status-pageflow/study-status-pageflow.module').then(
            m => m.StudyStatusPageFlowModule
          )
      },

      {
        path: 'external-data-list',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-external-data-list/study-external-data-list.module').then(
            m => m.StudyExternalDataListModule
          ),
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-external-data-edit', redirectUrl: 'external-data-view' }
      },
      {
        path: 'external-data-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-external-data-list/study-external-data-list.module').then(
            m => m.StudyExternalDataListModule
          ),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'tasks',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-tasks/study-tasks.module').then(m => m.StudyTasksModule)
      },

      {
        path: 'cdms-group',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/study-cdms-group.module').then(
            m => m.StudyCdmsGroupModule
          )
      },

      {
        path: 'cds-group',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-group.module').then(m => m.StudyCdsGroupModule)
      },

      {
        path: 'quality-group',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/quality-group/quality-group.module').then(m => m.QualityGroupModule)
      },

      {
        path: 'local-labs',
        component: StudyLocalLabsComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-local-labs-edit', redirectUrl: 'local-labs-view' }
      },
      
      {
        path: 'local-labs-view',
        component: StudyLocalLabsViewComponent
      },
      // { // not required
      //   path: 'offline-ignore',
      //   component: StudyOfflineIgnoreComponent,
      //   canDeactivate: [CanDeactivateGuard]
      // },
      {
        path: 'dbl-main',
        component: DatabaseLockDashboardMainDblComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-database-lock-dashboard-edit', redirectUrl: 'dbl-main-view' }
      },
      {
        path: 'dbl-main-view',
        component: DatabaseLockDashboardMainDblViewComponent
      },
      // { // not required
      //   path: 'dbl-followup',
      //   component: DatabaseLockDashboardFollowupDblComponent,
      //   canDeactivate: [CanDeactivateGuard]
      // },

      {
        path: 'gsk-group',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-gsk-group/study-gsk-group.module').then(m => m.StudyGskGroupModule)
      },
      {
        path: 'fte-computations',
        component: FteComputationsComponent,
        canDeactivate: [CanDeactivateGuard]
      },

      {
        path: 'imi-review-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-review/imi-review.module').then(m => m.ImiReviewGroupModule)
      },
      {
        path: 'imi-description-assumptions',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-details-group/imi-details-group.module').then(
            m => m.ImiDetailsGroupModule
          )
      },

      {
        path: 'imi-resources',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-study-resources/imi-study-resources.module').then(
            m => m.ImiStudyResourcesModule
          ),
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-imi-resources-edit', redirectUrl: 'imi-resources-view' }
      },

      {
        path: 'imi-resources-view',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-study-resources/imi-study-resources.module').then(
            m => m.ImiStudyResourcesModule
          ),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'imi-status',
        component: ImiStudyStatusComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-imi-status-edit', redirectUrl: 'imi-status-view' }
      },
      {
        path: 'imi-status-view',
        component: ImiStudyStatusViewComponent
      },
      
      {
        path: 'imi-timelines',
        component: ImiStudyTimelinesComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-imi-timelines-edit', redirectUrl: 'imi-timelines-view' }
      },
      {
        path: 'imi-timelines-view',
        component: ImiStudyTimelinesViewComponent
      },
      
      {
        path: 'imi-cdms-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-cdms-group/imi-cdms-group.module').then(m => m.ImiCdmsGroupModule)
      },
      {
        path: 'imi-trackers-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-trackers-group/imi-trackers-group.module').then(
            m => m.ImiTrackersGroupModule
          )
      },

      {
        path: 'study-info',
        component: StudyInfoComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      ///study/dm-imi/review/no-permissions-view
      {
        path: 'no-permissions-view',
        component: NoPermissionComponent
      },
      {
        path: '**',
        redirectTo: 'no-permissions-view'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyDmImiRoutingModule {}
