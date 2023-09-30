import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';

import { ImiCdmsGroupContainerComponent } from './imi-cdms-group-container/imi-cdms-group-container.component';
import { ImiStudyCdmsViewComponent } from './imi-study-cdms-view/imi-study-cdms-view.component';
import { ImiStudyCdmsComponent } from './imi-study-cdms/imi-study-cdms.component';

const routes: Routes = [
  {
    path: '',
    component: ImiCdmsGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cdms'
      },

      {
        path: 'cdms',
        component: ImiStudyCdmsComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        // data: {  parentPath: 'study/imi/cdms-group' },

      },
      {
        path: 'cdms-view',
        component: ImiStudyCdmsViewComponent
      },
      {
        path: 'cdms-tracker',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-cdms-group/imi-study-cdms-tracker/imi-study-cdms-tracker.module').then(
            m => m.ImiStudyCdmsTrackerModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'imi-study-cdms-tracker-edit', redirectUrl: 'cdms-tracker-view' }
      },
      {
        path: 'cdms-tracker-view',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-cdms-group/imi-study-cdms-tracker/imi-study-cdms-tracker.module').then(
            m => m.ImiStudyCdmsTrackerModule
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
export class ImiCdmsGroupRoutingModule {}
