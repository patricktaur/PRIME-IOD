import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import {NoaccessComponent} from '@app/noaccess/noaccess.component'
import { NoPermissionComponent } from '../../no-permission/no-permission.component';

import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
// import { StudyDmContainerComponent } from './study-container/study-container.component';
import { StudyDmContainerComponent } from '@app/prism/study/study-group/study-dm/study-dm-container/study-dm-container.component';
import { StudyLocalLabsComponent } from '@app/prism/study/study-tabs/study-local-labs/study-local-labs.component';
import { StudyInfoComponent } from '@app/prism/study/study-info/study-info.component';
import { FteComputationsComponent } from '@app/prism/study/study-tabs/study-fte-computations/fte-computations.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyLocalLabsViewComponent } from '../../study-tabs/study-local-labs-view/study-local-labs-view.component';
import { DatabaseLockDashboardMainDblComponent } from '../../study-tabs/database-lock-dashboard-main-dbl/database-lock-dashboard-main-dbl.component';
import { DatabaseLockDashboardMainDblViewComponent } from '../../study-tabs/database-lock-dashboard-main-dbl-view/database-lock-dashboard-main-dbl-view.component';
import { StudyEditComponent } from '../../study-tabs/study-edit/study-edit.component';

const routes: Routes = [
  {
    path: '',
    component: StudyDmContainerComponent,
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
        data: {
          parentPath: 'study/dm',
          debugMode : true
        }
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
        path: 'timeline-group',
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
        path: 'tasks-group',
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
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ PermissionGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'local-labs-view' }
      },
      
      {
        path: 'local-labs-view',
        component: StudyLocalLabsViewComponent
      },
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
        path: 'study-info',
        component: StudyInfoComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'no-permissions-view',
        component: NoPermissionComponent
      },
      // {
      //   path : 'no-access',
      //   component: NoaccessComponent
      // },

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
export class StudyDmRoutingModule {}
