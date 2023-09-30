import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminImiContainerComponent } from './admin-imi-container/admin-imi-container.component';

import { ImiCdmsTasksListComponent } from './imi-cdms-tasks/imi-cdms-tasks-list/imi-cdms-tasks-list.component';
import { ImiCdmsTasksEditComponent } from './imi-cdms-tasks/imi-cdms-tasks-edit/imi-cdms-tasks-edit.component';
import { ImiCdmsTaskGroupsListComponent } from './imi-cdms-task-groups/imi-cdms-task-groups-list/imi-cdms-task-groups-list.component';
import { ImiCdmsTaskGroupsEditComponent } from './imi-cdms-task-groups/imi-cdms-task-groups-edit/imi-cdms-task-groups-edit.component';
import { ImiCdmsAndCdmsTypeListComponent } from './imi-cdms-and-cdms-type/imi-cdms-and-cdms-type-list/imi-cdms-and-cdms-type-list.component';
import { ImiCdmsAndCdmsTypeEditComponent } from './imi-cdms-and-cdms-type/imi-cdms-and-cdms-type-edit/imi-cdms-and-cdms-type-edit.component';
import { PermissionGuard } from '@app/core/authentication/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminImiContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'imi-cdms-tasks'
      },
      {
        path: 'imi-cdms-tasks',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: ImiCdmsTasksListComponent
        },
        {
          path: 'edit',
          component: ImiCdmsTasksEditComponent
        }],
        canActivate: [PermissionGuard]
      },   
      {
        path: 'imi-cdms-tasks-groups',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: ImiCdmsTaskGroupsListComponent
        },
        {
          path: 'edit',
          component: ImiCdmsTaskGroupsEditComponent
        }],
        canActivate: [PermissionGuard]
      },
      {
        path: 'imi-cdms-and-cdms-type',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: ImiCdmsAndCdmsTypeListComponent
        },
        {
          path: 'edit',
          component: ImiCdmsAndCdmsTypeEditComponent
        }],
        canActivate: [PermissionGuard]
      },
      {
        path: 'imi-review-categories-codelist',
        loadChildren: () =>
          import('@app/prism/admin/admin-imi/imi-review-categories-codelist/imi-review-categories-codelist.module').then(m => m.ImiReviewCategoriesCodelistModule),
        canActivate: [PermissionGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminImiRoutingModule {}
