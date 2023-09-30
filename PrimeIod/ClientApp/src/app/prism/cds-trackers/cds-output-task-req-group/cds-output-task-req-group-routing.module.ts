import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CDSOutputTaskGroupContainerComponent } from './cds-output-task-req-group-container/cds-output-task-req-group-container.component';
import { CDSOutputTaskGroupListComponent } from './cds-output-task-req-group-list/cds-output-task-req-group-list.component';
import { StudyCDSOutputTaskEditComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-task-item-group/study-cds-output-task-edit/study-cds-output-task-edit.component';
import { CdsOutReqDashNListComponent } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-out-req-dash-n-list/cds-out-req-dash-n-list.component';
const routes: Routes = [
  {
    path: '',
    component: CDSOutputTaskGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CDSOutputTaskGroupListComponent
      },
      {
        path: 'dashboard-list',
        component: CdsOutReqDashNListComponent
      },
      {
        path: 'new',
        component: StudyCDSOutputTaskEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-task-item-group/study-cds-output-task-item-group.module'
          ).then(m => m.StudyCdsOutputTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CDSOutputTaskGroupRoutingModule {}
