import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiStudyRequestsContainerComponent } from './imi-study-requests-container/imi-study-requests-container.component';
import { ImiStudyRequestRequestListComponent } from './imi-study-request-request/imi-study-request-request-list/imi-study-request-request-list.component';
import { ImiStudyRequestRequestEditComponent } from './imi-study-request-request/imi-study-request-request-edit/imi-study-request-request-edit.component';
import { ImiStudyRequestApprovalListComponent } from './imi-study-request-approval/imi-study-request-approval-list/imi-study-request-approval-list.component';
import { ImiStudyRequestApprovalEditComponent } from './imi-study-request-approval/imi-study-request-approval-edit/imi-study-request-approval-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ImiStudyRequestsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'request-list'
      },
      {
        path: 'request-list',
        component: ImiStudyRequestRequestListComponent
      },
      {
        path: 'edit',
        component: ImiStudyRequestRequestEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'approval-list',
        component: ImiStudyRequestApprovalListComponent
      },
      {
        path: 'approval-edit',
        component: ImiStudyRequestApprovalEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiStudyRequestsRoutingModule {}
