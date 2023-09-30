import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { StudyCrmContainerComponent } from './study-crm-container/study-crm-container.component';

import { CrmStudyDetailsComponent } from '@app/prism/crm/crm-tabs/crm-study-details/crm-study-details.component';
import { CrmStudyAwardManagementComponent } from '@app/prism/crm/crm-tabs/crm-study-award-management/crm-study-award-management.component';
import { CrmStudyTimelinesComponent } from '@app/prism/crm/crm-tabs/crm-study-timelines/crm-study-timelines.component';
import { CrmStudyAnalysisPlanningComponent } from '@app/prism/crm/crm-tabs/crm-study-analysis-planning/crm-study-analysis-planning.component';
import { CrmStudyDetailsViewComponent } from '@app/prism/crm/crm-tabs/crm-study-details-view/crm-study-details-view.component';
import { CrmStudyAwardManagementViewComponent } from '@app/prism/crm/crm-tabs/crm-study-award-management-view/crm-study-award-management-view.component';
import { CrmStudyTimelinesViewComponent } from '@app/prism/crm/crm-tabs/crm-study-timelines-view/crm-study-timelines-view.component';
import { CrmStudyAnalysisPlanningViewComponent } from '@app/prism/crm/crm-tabs/crm-study-analysis-planning-view/crm-study-analysis-planning-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { NoPermissionComponent } from '../../no-permission/no-permission.component';
const routes: Routes = [
  {
    path: '',
    component: StudyCrmContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'crm-study-award-management'
      },
      {
        path: 'crm-study-details',
        component: CrmStudyDetailsComponent,
       
        canDeactivate: [CanDeactivateGuard],
         
      },
      {
        path: 'crm-study-details-view',
        component: CrmStudyDetailsViewComponent,
        
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'crm-study-award-management',
        component: CrmStudyAwardManagementComponent,
        
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        data: {  parentPath: 'study/crm' },
      },
      {
        path: 'crm-study-award-management-view',
        component: CrmStudyAwardManagementViewComponent,
        
        canDeactivate: [CanDeactivateGuard],
        // todo:  
        // canActivate: [PermissionGuard],
        // data: {  parentPath: 'study/crm', debugMode :'true'  },
      },
      {
        path: 'crm-study-timelines',
        component: CrmStudyTimelinesComponent,
         
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        data: {  parentPath: 'study/crm' },
      },
      {
        path: 'crm-study-timelines-view',
        component: CrmStudyTimelinesViewComponent,

        // canActivate: [PermissionGuard],
        // canDeactivate: [CanDeactivateGuard],
        // data: {  parentPath: 'study/crm' },
      },
      {
        path: 'crm-study-resources',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources.module').then(
            m => m.CrmStudyResourcesModule
          ),
          canActivate: [PermissionGuard],
          data: {  parentPath: 'study/crm' },
      },
      {
        path: 'crm-study-resources-view',
          
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources.module').then(
            m => m.CrmStudyResourcesModule
          ),
          // canActivate: [PermissionGuard],
          data: {
            mode: 'view', parentPath: 'study/crm'
          }
          
      },
      {
        path: 'crm-budget',
        loadChildren: () => import('@app/prism/crm/crm-tabs/crm-budget/crm-budget.module').then(m => m.CrmBudgetModule),
        canActivate: [PermissionGuard],
        data: {  parentPath: 'study/crm' }
      },
      {
        path: 'crm-budget-view',
        loadChildren: () => import('@app/prism/crm/crm-tabs/crm-budget/crm-budget.module').then(m => m.CrmBudgetModule),
        //  canActivate: [PermissionGuard],
        data: {
          mode: 'view', parentPath: 'study/crm' 
        }
      },
      {
        path: 'crm-study-analysis-planning',
        component: CrmStudyAnalysisPlanningComponent,
        canActivate: [PermissionGuard],
        canDeactivate: [CanDeactivateGuard],
        data: {  parentPath: 'study/crm' }

      },
      {
        path: 'crm-study-analysis-planning-view',
        component: CrmStudyAnalysisPlanningViewComponent,
        // canActivate: [PermissionGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {        
        path: 'crm-project-governance',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-project-governance/crm-project-governance.module').then(
            m => m.CrmProjectGovernanceModule
          ),
          //Permission Guard not required here -- Pat 28Apr2023:
          //  canActivate: [PermissionGuard],
          // data: {  parentPath: 'study/crm' }
      },
      
      {
        path: 'no-permission',
        component: NoPermissionComponent
      },
      {
        path: '**',
        redirectTo: 'crm/crm-study-award-management'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCrmRoutingModule {}
