import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CodelistRequestsContainerComponent } from './codelist-requests-container/codelist-requests-container.component';
import { CreateRequestListComponent } from './create/create-request-list/create-request-list.component';
import { CreateRequestEditComponent } from './create/create-request-edit/create-request-edit.component';
import { UpdateRequestEditComponent } from './update/update-request-edit/update-request-edit.component';
import { UpdateRequestListComponent } from './update/update-request-list/update-request-list.component';
import { DeactivateRequestListComponent } from './deactivate/deactivate-request-list/deactivate-request-list.component';
import { DeactivateRequestEditComponent } from './deactivate/deactivate-request-edit/deactivate-request-edit.component';
import { ApprovalRequestListComponent } from './approval/approval-request-list/approval-request-list.component';
import { ApprovalRequestEditComponent } from './approval/approval-request-edit/approval-request-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CodelistRequestsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create-request-list'
      },
      {
        path: 'create-request-list',
        component: CreateRequestListComponent
      },
      {
        path: 'create-request-edit',
        component: CreateRequestEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'update-request-list',
        component: UpdateRequestListComponent
      },
      {
        path: 'update-request-edit',
        component: UpdateRequestEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'deactivate-request-list',
        component: DeactivateRequestListComponent
      },
      {
        path: 'deactivate-request-edit',
        component: DeactivateRequestEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'approval-request-list',
        component: ApprovalRequestListComponent
      },
      {
        path: 'approval-request-edit',
        component: ApprovalRequestEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodelistRequestsRoutingModule {}
