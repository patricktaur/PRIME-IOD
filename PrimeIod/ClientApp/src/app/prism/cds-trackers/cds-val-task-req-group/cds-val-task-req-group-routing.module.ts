import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CdsValTaskReqGroupContainerComponent } from './cds-val-task-req-group-container/cds-val-task-req-group-container.component';
import { CdsValTaskListComponent } from './cds-val-task-list/cds-val-task-list.component';
const routes: Routes = [
  {
    path: '',
    component: CdsValTaskReqGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CdsValTaskListComponent
      },
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
export class CdsValTaskReqGroupRoutingModule {}
