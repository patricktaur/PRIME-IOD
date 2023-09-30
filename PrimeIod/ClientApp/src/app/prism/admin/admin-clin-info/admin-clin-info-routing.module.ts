import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminClinInfoContainerComponent } from './admin-clin-info-container/admin-clin-info-container.component';

import { ClininfoCdmsTasksListComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-list/clininfo-cdms-tasks-list.component';
import { ClininfoCdmsTasksEditComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-edit/clininfo-cdms-tasks-edit.component';
import { ClininfoCdmsTaskGroupsListComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-list/clininfo-cdms-task-groups-list.component';
import { ClininfoCdmsTaskGroupsEditComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-edit/clininfo-cdms-task-groups-edit.component';
import { ClininfoCdmsAndCdmsTypeListComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-list/clininfo-cdms-and-cdms-type-list.component';
import { ClininfoCdmsAndCdmsTypeEditComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-edit/clininfo-cdms-and-cdms-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminClinInfoContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clininfo-cdms-tasks'
      },
      {
        path: 'clininfo-cdms-tasks',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: ClininfoCdmsTasksListComponent
        },
        {
          path: 'edit',
          component: ClininfoCdmsTasksEditComponent
        }
      ]},
      {
        path: 'clininfo-cdms-task-groups',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: ClininfoCdmsTaskGroupsListComponent
        },
        {
          path: 'edit',
          component: ClininfoCdmsTaskGroupsEditComponent
        },
      ]},
      {
        path: 'clininfo-cdms-and-cdms-type',
        children: [{
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
        }, 
        {
          path: 'list',
          component: ClininfoCdmsAndCdmsTypeListComponent
        },
        {
          path: 'edit',
          component: ClininfoCdmsAndCdmsTypeEditComponent
        }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminClinInfoRoutingModule {}
