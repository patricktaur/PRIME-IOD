import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { CrmProjectGovernanceContainerComponent } from './crm-project-governance-container/crm-project-governance-container.component';

import {CrmProjGovEditComponent} from './crm-proj-gov-edit/crm-proj-gov-edit.component'

import { CrmProjGovCurrentViewComponent} from './crm-proj-gov-current-view/crm-proj-gov-current-view.component'
const routes: Routes = [
  {
    path: '',
    component: CrmProjectGovernanceContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'crm-project-governance-setup'
      },
      
      {
        path: 'crm-project-governance-setup',
        component: CrmProjGovEditComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
         data: {  parentPath: 'study/dm-crm/crm-project-governance', groupId: 1 }
      },
      {
        path: 'crm-project-governance-setup-view',
        component:  CrmProjGovCurrentViewComponent, // CrmProjectGovernanceSetupViewComponent
        data: {   groupId: 1 }
      },
 
      {
        path: 'crm-project-governance-ongoing',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-project-governance/crm-proj-gov-on-going/crm-proj-gov-on-going.module').then(
            m => m.CrmProjGovOnGoingModule
          )
         
      },


      {
        path: 'crm-project-governance-ongoing-view',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-project-governance/crm-proj-gov-on-going-view/crm-proj-gov-on-going-view.module').then(
            m => m.CrmProjGovOnGoingViewModule
          )
         
      },


      {
        path: 'crm-project-governance-analysis',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-project-governance/crm-proj-gov-analysis/crm-proj-gov-analysis.module').then(
            m => m.CrmProjGovAnalysisModule
          )
         
      },
    

      {
        path: 'crm-project-governance-analysis-view',
        loadChildren: () =>
          import('@app/prism/crm/crm-tabs/crm-project-governance/crm-proj-gov-analysis-view/crm-proj-gov-analysis-view.module').then(
            m => m.CrmProjGovAnalysisViewModule
          )
         
      },
 

      {
        path: 'crm-project-governance-closure',
        component: CrmProjGovEditComponent,
        canDeactivate: [CanDeactivateGuard],
         data: {   groupId: 4 }
      },



      {
        path: 'crm-project-governance-closure-view',
        component:  CrmProjGovCurrentViewComponent, 
        data: {   groupId: 4 }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmProjectGovernanceRoutingModule {}
