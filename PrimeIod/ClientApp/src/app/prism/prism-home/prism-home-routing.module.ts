import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { PrismHomeContainerComponent } from '@app/prism/prism-home/prism-home-container/prism-home-container.component';
import { StudyListComponent } from '@app/prism/prism-home/study-list/study-list.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';
import { HomeCdsDashboardsComponent } from '@app/prism/prism-home/home-cds-dashboards/home-cds-dashboards.component';
import { ImiStudyListComponent } from '@app/prism/prism-home/imi-study-list/imi-study-list.component';
import { StudyMembersComponent } from './study-members/study-members.component';
import { CrmListComponent } from '@app/prism/crm/crm-shared/crm-list/crm-list/crm-list.component';
// Prism\ClientApp\src\app\prism\crm\crm-list\crm-list.component.ts

const routes: Routes = [
  {
    path: '',
    component: PrismHomeContainerComponent,
    
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cds-dashboard',
        
      },
      {
        path: 'study-team-members',
        component: StudyMembersComponent,
        canActivate: [  PermissionGuard, ],
        data: {
          parentPath: 'prism-home',
          
        }
      },
      {
        path: 'cds-dashboard',
        component: HomeCdsDashboardsComponent,
        canActivate: [  PermissionGuard, ],
        data: {
          parentPath: 'prism-home',
          
        }
      },
      {
        path: 'study-list',
        component: StudyListComponent,
        
        data: {
          parentPath: 'prism-home'
        }      
      },

      {
        path: 'imi-study-list',
        component: ImiStudyListComponent,
        
        data: {
          parentPath: 'prism-home'
        }      
      },
      {
        path: 'crm-list',
        component: CrmListComponent,
        
        data: {
          parentPath: 'prism-home'
        }      
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrismHomeRoutingModule {}
