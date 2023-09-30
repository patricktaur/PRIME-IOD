import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { UserRequestsContainerComponent } from './user-requests-container/user-requests-container.component';
import { CreateRequestsListComponent } from './create/create-requests-list/create-requests-list.component';
import { CreateRequestsEditComponent } from './create/create-requests-edit/create-requests-edit.component';
import { UpdateRequestEditComponent } from './update/update-request-edit/update-request-edit.component';
import { UpdateRequestListComponent } from './update/update-request-list/update-request-list.component';
import { DeactivateRequestListComponent } from './deactivate/deactivate-request-list/deactivate-request-list.component';
import { DeactivateRequestEditComponent } from './deactivate/deactivate-request-edit/deactivate-request-edit.component';
import { ApprovalRequestListComponent } from './approval/approval-request-list/approval-request-list.component';
import { ApprovalRequestEditComponent } from './approval/approval-request-edit/approval-request-edit.component';
import { ApprovalRequestUpdateComponent } from './approval/approval-request-update/approval-update-request.component';
import { ApprovalRequestDeactivateComponent } from './approval/approval-request-deactivate/approval-request-deactivate.component';
const routes: Routes = [
  {
    path: '',
    component: UserRequestsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create-request-list'
      },
      {
        path: 'create-request-list',
        component: CreateRequestsListComponent
      },
      {
        path: 'create-request-edit',
        component: CreateRequestsEditComponent,
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
      },
      {
        path: 'approval-request-update',
        component: ApprovalRequestUpdateComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'approval-request-deactivate',
        component: ApprovalRequestDeactivateComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRequestsRoutingModule {}
