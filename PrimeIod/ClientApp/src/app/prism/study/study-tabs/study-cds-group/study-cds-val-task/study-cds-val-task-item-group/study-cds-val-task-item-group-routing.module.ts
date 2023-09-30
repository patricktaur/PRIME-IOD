import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { StudyCdsValTaskItemGroupContainerComponent } from './study-cds-val-task-item-group-container/study-cds-val-task-item-group-container.component';
import { StudyCdsValTaskViewComponent } from './study-cds-val-task-view/study-cds-val-task-view.component';
import { StudyCdsValTaskHistoryComponent } from './study-cds-val-task-history/study-cds-val-task-history.component';
import { StudyCDSValTaskEditComponent } from './study-cds-val-task-edit/study-cds-val-task-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudyCdsValTaskItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: StudyCdsValTaskViewComponent
      },
      {
        path: 'history',
        component: StudyCdsValTaskHistoryComponent
      },
      {
        path: 'edit',
        component: StudyCDSValTaskEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '**',
        component: StudyCdsValTaskViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdsValTaskItemGroupRoutingModule {}
