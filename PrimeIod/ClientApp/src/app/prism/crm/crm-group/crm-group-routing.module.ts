import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { CrmGroupContainerComponent } from './crm-group-container/crm-group-container.component';
const routes: Routes = [
  {
    path: '',
    component: CrmGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'crm-tracker-3'
      },
      {
        path: 'crm-tracker-3',
        loadChildren: () =>
          import('@app/prism/crm/crm-group/crm-tracker-three/crm-tracker-three.module').then(
            m => m.CrmTrackerThreeModule
          ),
          canActivate: [PermissionGuard],
          data: {  parentPath: 'crm-trackers' },
      },
      {
        path: 'crm-tracker-3-view',
        loadChildren: () =>
          import('@app/prism/crm/crm-group/crm-tracker-three/crm-tracker-three.module').then(
            m => m.CrmTrackerThreeModule
          ),
        canActivate: [PermissionGuard],  
        data: {
          mode: 'view', parentPath: 'crm-trackers'
        }
      },
      {
        path: 'crm-tracker-4',
        loadChildren: () =>
          import('@app/prism/crm/crm-group/crm-tracker-four/crm-tracker-four.module').then(m => m.CrmTrackerFourModule),
          canActivate: [PermissionGuard],
          data: {  parentPath: 'crm-trackers' }
      },
      {
        path: 'crm-tracker-4-view',
        loadChildren: () =>
          import('@app/prism/crm/crm-group/crm-tracker-four/crm-tracker-four.module').then(m => m.CrmTrackerFourModule),
          canActivate: [PermissionGuard],  
        data: {
          mode: 'view', parentPath: 'crm-trackers'
        }
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmGroupRoutingModule {}
