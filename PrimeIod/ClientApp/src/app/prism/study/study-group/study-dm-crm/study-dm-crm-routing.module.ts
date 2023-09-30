import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { PermissionGuard } from '@app/core/authentication/permission.guard'

import { StudyDmCrmContainerComponent } from './study-dm-crm-container/study-dm-crm-container.component';
import { StudyLocalLabsComponent } from '@app/prism/study/study-tabs/study-local-labs/study-local-labs.component';
import { StudyInfoComponent } from '@app/prism/study/study-info/study-info.component';
import { FteComputationsComponent } from '@app/prism/study/study-tabs/study-fte-computations/fte-computations.component';
import { CrmStudyDetailsComponent } from '@app/prism/crm/crm-tabs/crm-study-details/crm-study-details.component';
import { CrmStudyAwardManagementComponent } from '@app/prism/crm/crm-tabs/crm-study-award-management/crm-study-award-management.component';
import { CrmStudyTimelinesComponent } from '@app/prism/crm/crm-tabs/crm-study-timelines/crm-study-timelines.component';
import { CrmStudyAnalysisPlanningComponent } from '@app/prism/crm/crm-tabs/crm-study-analysis-planning/crm-study-analysis-planning.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyLocalLabsViewComponent } from '../../study-tabs/study-local-labs-view/study-local-labs-view.component';
import { CrmStudyAwardManagementViewComponent } from '@app/prism/crm/crm-tabs/crm-study-award-management-view/crm-study-award-management-view.component';
import { CrmStudyDetailsViewComponent } from '@app/prism/crm/crm-tabs/crm-study-details-view/crm-study-details-view.component';
import { CrmStudyTimelinesViewComponent } from '@app/prism/crm/crm-tabs/crm-study-timelines-view/crm-study-timelines-view.component';
import { CrmStudyAnalysisPlanningViewComponent } from '@app/prism/crm/crm-tabs/crm-study-analysis-planning-view/crm-study-analysis-planning-view.component';
import { DatabaseLockDashboardMainDblComponent } from '../../study-tabs/database-lock-dashboard-main-dbl/database-lock-dashboard-main-dbl.component';
import { DatabaseLockDashboardMainDblViewComponent } from '../../study-tabs/database-lock-dashboard-main-dbl-view/database-lock-dashboard-main-dbl-view.component';
import { NoPermissionComponent } from '../../no-permission/no-permission.component';
import { StudyEditComponent } from '../../study-tabs/study-edit/study-edit.component';

const routes: Routes = [
  {
    path: '',
    component: StudyDmCrmContainerComponent,
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
          data: {  parentPath: 'study/dm-crm' },
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
        // data: { compCode: 'study-external-data-edit', redirectUrl: 'external-data-view' }
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
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-local-labs-edit', redirectUrl: 'local-labs-view' }
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

      //--
      {
        path: 'crm-study-details',
        component: CrmStudyDetailsComponent,
        canDeactivate: [ CanDeactivateGuard ],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-crm-description-edit', redirectUrl: 'crm-study-details-view' }
      },
      {
        path: 'crm-study-details-view',
        component: CrmStudyDetailsViewComponent
      },
      {
        path: 'crm-study-award-management',
        component: CrmStudyAwardManagementComponent,
        canDeactivate: [ CanDeactivateGuard ],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-crm-award-edit', redirectUrl: 'crm-study-award-management-view' }
      },
      {
        path: 'crm-study-award-management-view',
        component: CrmStudyAwardManagementViewComponent
      },
      {
        path: 'crm-study-timelines',
        component: CrmStudyTimelinesComponent,
        canDeactivate: [ CanDeactivateGuard ],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-crm-timelines-edit', redirectUrl: 'crm-study-timelines-view' }
      },
      {
        path: 'crm-study-timelines-view',
        component: CrmStudyTimelinesViewComponent
      },
      {
        path: 'crm-study-resources',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources.module').then(
            m => m.CrmStudyResourcesModule
          ),
          data: {  parentPath: 'study/crm' }
      },
      {
        path: 'crm-study-resources-view',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources.module').then(
            m => m.CrmStudyResourcesModule
          ),
          data: {
            mode: 'view', parentPath: 'study/crm' 
          }
      },
      {
        path: 'crm-budget',
        //component: CrmBudgetComponent
        loadChildren: () => import('@app/prism/crm/crm-tabs/crm-budget/crm-budget.module').then(m => m.CrmBudgetModule)
      },
      {
        path: 'crm-budget-view',
        //component: CrmBudgetComponent
        loadChildren: () => import('@app/prism/crm/crm-tabs/crm-budget/crm-budget.module').then(m => m.CrmBudgetModule),
        data: {
          mode: 'view', parentPath: 'study/crm' 
        }
      },

      {
        path: 'crm-study-analysis-planning',
        component: CrmStudyAnalysisPlanningComponent
      },
      {
        path: 'crm-study-analysis-planning-view',
        component: CrmStudyAnalysisPlanningViewComponent
      },
      {
        path: 'crm-project-governance',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-project-governance/crm-project-governance.module').then(
            m => m.CrmProjectGovernanceModule
          ),
          data: {  parentPath: 'study/dm-crm' }
      },
      {
        path: 'crm-tracker-three',
        loadChildren: () =>
          import('@app/prism/crm/crm-group/crm-tracker-three/crm-tracker-three.module').then(
            m => m.CrmTrackerThreeModule
          )
      },
      {
        path: 'crm-tracker-four',
        loadChildren: () =>
          import('@app/prism/crm/crm-group/crm-tracker-four/crm-tracker-four.module').then(m => m.CrmTrackerFourModule)
      },
      {
        path: 'study-info',
        component: StudyInfoComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '**',
        component: NoPermissionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyDmCrmRoutingModule {}
