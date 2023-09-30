import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyRequestsContainerComponent } from './study-requests-container/study-requests-container.component';
import { StudyRequestsListComponent } from './study-requests-list/study-requests-list.component';
import { StudyRequestsEditComponent } from './study-requests-edit/study-requests-edit.component';
import { StudyRequestApprovalListComponent } from './approval/study-request-approval-list/study-request-approval-list.component';
import { StudyRequestApprovalEditComponent } from './approval/study-request-approval-edit/study-request-approval-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudyRequestsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'request-list'
      },
      {
        path: 'request-list',
        component: StudyRequestsListComponent
      },
      {
        path: 'edit',
        component: StudyRequestsEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'approval-list',
        component: StudyRequestApprovalListComponent
      },
      {
        path: 'approval-edit',
        component: StudyRequestApprovalEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRequestsRoutingModule {}
