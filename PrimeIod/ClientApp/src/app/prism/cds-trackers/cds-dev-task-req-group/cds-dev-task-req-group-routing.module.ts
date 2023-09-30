import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CdsDevTaskReqGroupContainerComponent } from './cds-dev-task-req-group-container/cds-dev-task-req-group-container.component';
import { CdsDevTaskReqGroupListComponent } from '@app/prism/cds-trackers/cds-dev-task-req-group/cds-dev-request-tracker-list/cds-dev-req-group-list.component';
import { StudyCDSDevelopmentTaskRequestsEditComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-req-item-group/study-cds-development-task-requests-edit/study-cds-dev-task-req-edit.component';
import { CdsDevReqDashboardListComponent } from '@app/prism/cds-trackers/cds-dev-task-req-group/cds-dev-req-dashboard-list/cds-dev-req-dashboard-list.component';
const routes: Routes = [
  {
    path: '',
    component: CdsDevTaskReqGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CdsDevTaskReqGroupListComponent
      },
      {
        path: 'dashboard-list',
        component: CdsDevReqDashboardListComponent
      },
      {
        path: 'new',
        component: StudyCDSDevelopmentTaskRequestsEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-req-item-group/study-cds-dev-task-req-item-group.module'
          ).then(m => m.StudyCdsDevTaskReqItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdsDevTaskReqGroupRoutingModule {}
