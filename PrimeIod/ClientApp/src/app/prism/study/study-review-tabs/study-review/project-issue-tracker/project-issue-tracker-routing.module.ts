import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { ProjectIssueTrackerContainerComponent } from './project-issue-tracker-container/project-issue-tracker-container.component';
import { ProjectIssueTrackerListComponent } from '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker-list/project-issue-tracker-list.component';
import { ProjectIssueTrackerEditComponent } from '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker-edit/project-issue-tracker-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: ProjectIssueTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ProjectIssueTrackerListComponent
      },
      {
        path: 'edit',
        component: ProjectIssueTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [StudyEditGuard],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'list' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectIssueTrackerRoutingModule {}
