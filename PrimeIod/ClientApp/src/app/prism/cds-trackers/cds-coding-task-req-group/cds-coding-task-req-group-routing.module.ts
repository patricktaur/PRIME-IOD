import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CdsCodingTaskReqGroupContainerComponent } from './cds-coding-task-req-group-container/cds-coding-task-req-group-container.component';
import { CdsCodingTaskReqGroupListComponent } from './cds-coding-task-req-group-list/cds-coding-task-req-group-list.component';
import { StudyCDSCodingTaskEditComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-task-item-group/study-cds-coding-task-edit/study-cds-coding-task-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CdsCodingTaskReqGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CdsCodingTaskReqGroupListComponent
      },
      {
        path: 'new',
        component: StudyCDSCodingTaskEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-task-item-group/study-cds-coding-task-item-group.module'
          ).then(m => m.StudyCdsCodingTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdsCodingTaskReqGroupRoutingModule {}
