import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CdmsContainerComponent } from './cdms-container/cdms-container.component';
import { CdmsTasksListComponent } from './cdms-tasks/cdms-tasks-list/cdms-tasks-list.component';
import { CdmsTasksEditComponent } from './cdms-tasks/cdms-tasks-edit/cdms-tasks-edit.component';
import { CdmsTaskGroupsListComponent } from './cdms-task-groups/cdms-task-groups-list/cdms-task-groups-list.component';
import { CdmsTaskGroupsEditComponent } from './cdms-task-groups/cdms-task-groups-edit/cdms-task-groups-edit.component';
import { CdmsAndCdmsTypeListComponent } from './cdms-and-cdms-type/cdms-and-cdms-type-list/cdms-and-cdms-type-list.component';
import { CdmsAndCdmsTypeEditComponent } from './cdms-and-cdms-type/cdms-and-cdms-type-edit/cdms-and-cdms-type-edit.component';

import { VeevaVaultVersionListComponent } from './veeva-vault-version/veeva-vault-version-list/veeva-vault-version-list.component';
import { VeevaVaultVersionEditComponent } from './veeva-vault-version/veeva-vault-version-edit/veeva-vault-version-edit.component';
import { RaveUrlVersionListComponent } from './rave-url-version/rave-url-version-list/rave-url-version-list.component';
import { RaveUrlVersionEditComponent } from './rave-url-version/rave-url-version-edit/rave-url-version-edit.component';
import { PermissionGuard } from '@app/core/authentication/permission.guard';


// import { ClininfoCdmsTasksListComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-list/clininfo-cdms-tasks-list.component';
// import { ClininfoCdmsTasksEditComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-edit/clininfo-cdms-tasks-edit.component';
// import { ClininfoCdmsTaskGroupsListComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-list/clininfo-cdms-task-groups-list.component';
// import { ClininfoCdmsTaskGroupsEditComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-edit/clininfo-cdms-task-groups-edit.component';
// import { ClininfoCdmsAndCdmsTypeListComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-list/clininfo-cdms-and-cdms-type-list.component';
// import { ClininfoCdmsAndCdmsTypeEditComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-edit/clininfo-cdms-and-cdms-type-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CdmsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cdms-tasks',
      },
      {
        path: 'cdms-tasks',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: CdmsTasksListComponent,
          // canActivate: [PermissionGuard]
        },
        {
          path: 'edit',
          component: CdmsTasksEditComponent,
        }],
        canActivate: [PermissionGuard]
      },
      {
        path: 'cdms-and-cdms-type',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: CdmsAndCdmsTypeListComponent,
          // canActivate: [PermissionGuard]
        },
        {
          path: 'edit',
          component: CdmsAndCdmsTypeEditComponent  
        }],
        canActivate: [PermissionGuard]
      },
      {
        path: 'cdms-tasks-groups',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: CdmsTaskGroupsListComponent
        },
        {
          path: 'edit',
          component: CdmsTaskGroupsEditComponent
        }],
        canActivate: [PermissionGuard]
      },
      {
        path: 'veeva-vault-version',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: VeevaVaultVersionListComponent,
        },
        {
          path: 'edit',
          component: VeevaVaultVersionEditComponent
        }],
        canActivate: [PermissionGuard]
      }, 
      {
        path: 'rave-url-version',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: RaveUrlVersionListComponent
        },
        {
          path: 'edit',
          component: RaveUrlVersionEditComponent
        }],
        canActivate: [PermissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CDMSRoutingModule {}
