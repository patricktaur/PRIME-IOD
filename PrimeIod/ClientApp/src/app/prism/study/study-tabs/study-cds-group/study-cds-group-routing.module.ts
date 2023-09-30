import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { StudyCdsGroupContainerComponent } from './study-cds-group-container/study-cds-group-container.component';
import { StudyCdsComponent } from './study-cds/study-cds.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';
import { StudyCdsViewComponent } from './study-cds-view/study-cds-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

const routes: Routes = [
  {
    path: '',
    component: StudyCdsGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cds'
      },

      {
        path: 'cds',
        component: StudyCdsComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        
      },
      {
        path: 'cds-view',
        component: StudyCdsViewComponent
      },

      {
        path: 'development-request',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-development-task-requests.module'
          ).then(m => m.StudyCDSDevelopmentTaskRequestsModule),
        
      },
      {
        path: 'development-request-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-development-task-requests.module'
          ).then(m => m.StudyCDSDevelopmentTaskRequestsModule),
        data: {
          mode: 'view'
        }
      },
      //hidden based on UAT request Sep 2022
      // {
      //   path: 'val-request',
      //   loadChildren: () =>
      //     import('@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-task.module').then(
      //       m => m.StudyCDSValTaskModule
      //     )
      // },
      {
        path: 'output-request',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-task.module').then(
            m => m.StudyCDSOutputTaskModule
          ),
       
      },
      {
        path: 'output-request-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-task.module').then(
            m => m.StudyCDSOutputTaskModule
          ),
        data: { 
          mode: 'view' 
        }
      },
      {
        path: 'delivery-request',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-task.module'
          ).then(m => m.StudyCDSDeliveryTaskModule),
       
      },
      {
        path: 'delivery-request-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-task.module'
          ).then(m => m.StudyCDSDeliveryTaskModule),
        data: {
          mode: 'view'
        }
      },
      {
        path: 'programming-instructions',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task.module').then(
            m => m.StudyCDSInstTaskModule
          ),
        
      },
      {
        path: 'programming-instructions-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task.module').then(
            m => m.StudyCDSInstTaskModule
          ),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'coding-request',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-task.module').then(
            m => m.StudyCDSCodingTaskModule
          ),
       
      },
      {
        path: 'coding-request-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-task.module').then(
            m => m.StudyCDSCodingTaskModule
          ),
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
export class StudyCdsGroupRoutingModule {}
