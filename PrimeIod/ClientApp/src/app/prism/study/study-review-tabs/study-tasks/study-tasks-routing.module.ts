import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { StudyTasksContainerComponent } from '@app/prism/study/study-review-tabs/study-tasks/study-tasks-container/study-tasks-container.component';
import { StudyTasksListComponent } from '@app/prism/study/study-review-tabs/study-tasks/study-tasks-list/study-tasks-list.component';
import { StudyTasksListViewComponent } from './study-tasks-list-view/study-tasks-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: StudyTasksContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
      },
      {
        path: 'tasks',
        component: StudyTasksListComponent,
        
        canDeactivate: [CanDeactivateGuard],
        data: {  parentPath: 'study/tasks' },
      },
      {
        path: 'tasks-view',
        component: StudyTasksListViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyTasksRoutingModule {}
