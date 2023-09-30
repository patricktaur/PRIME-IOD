import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiStudyIssueTrackerContainerComponent } from './imi-study-issue-tracker-container/imi-study-issue-tracker-container.component';
import { ImiStudyIssueTrackerListComponent } from './imi-study-issue-tracker-list/imi-study-issue-tracker-list.component';
import { ImiStudyIssueTrackerEditComponent } from './imi-study-issue-tracker-edit/imi-study-issue-tracker-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { PermissionGuard } from '@app/core/authentication/permission.guard';
const routes: Routes = [
  {
    path: '',
    component: ImiStudyIssueTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ImiStudyIssueTrackerListComponent
      },
      {
        path: 'edit',
        component: ImiStudyIssueTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [PermissionGuard],
        // data: { userRole: UserRoles.IMI_PM, redirectUrl: 'list' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiStudyIssueTrackerRoutingModule {}
