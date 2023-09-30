import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CdsDelTaskReqGroupContainerComponent } from './cds-del-task-req-group-container/cds-del-task-req-group-container.component';
import { CdsDelTaskReqGroupListComponent } from './cds-del-task-req-group-list/cds-del-task-req-group-list.component';
import { StudyCDSDeliveryTaskEditComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-task-item-group/study-cds-delivery-task-edit/study-cds-delivery-task-edit.component';
import { CdsDelReqDashNListComponent } from '@app/prism/cds-trackers/cds-del-task-req-group/cds-del-req-dash-n-list/cds-del-req-dash-n-list.component';
const routes: Routes = [
  {
    path: '',
    component: CdsDelTaskReqGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CdsDelTaskReqGroupListComponent
      },
      {
        path: 'dashboard-list',
        component: CdsDelReqDashNListComponent
      },
      {
        path: 'new',
        component: StudyCDSDeliveryTaskEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-task-item-group/study-cds-delivery-task-item-group.module'
          ).then(m => m.StudyCdsDeliveryTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdsDelTaskReqGroupRoutingModule {}
