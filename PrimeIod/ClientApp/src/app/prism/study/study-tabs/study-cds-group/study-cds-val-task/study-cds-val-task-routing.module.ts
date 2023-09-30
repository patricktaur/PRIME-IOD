import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSValTaskContainerComponent } from './study-cds-val-task-container/study-cds-val-task-container.component';
import { StudyCDSValTaskListComponent } from './study-cds-val-task-list/study-cds-val-task-list.component';
import { StudyCDSValTaskEditComponent } from './study-cds-val-task-item-group/study-cds-val-task-edit/study-cds-val-task-edit.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';

const routes: Routes = [
  {
    path: '',
    component: StudyCDSValTaskContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCDSValTaskListComponent
      },
      // {
      //   path: 'edit',
      //   component: StudyCDSValTaskEditComponent,
      //   canDeactivate: [CanDeactivateGuard]
      // },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-task-item-group/study-cds-val-task-item-group.module'
          ).then(m => m.StudyCdsValTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCDSValTaskRoutingModule {}
