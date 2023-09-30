import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CdsInstTaskReqGroupContainerComponent } from './cds-inst-task-req-group-container/cds-inst-task-req-group-container.component';
import { CdsInstTaskReqGroupListComponent } from './cds-inst-task-req-group-list/cds-inst-task-req-group-list.component';
import { StudyCDSInstTaskEditComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task-item-group/study-cds-inst-task-edit/study-cds-inst-task-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CdsInstTaskReqGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CdsInstTaskReqGroupListComponent
      },
      {
        path: 'new',
        component: StudyCDSInstTaskEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task-item-group/study-cds-inst-task-item-group.module'
          ).then(m => m.StudyCdsInstTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdsInstTaskReqGroupRoutingModule {}
