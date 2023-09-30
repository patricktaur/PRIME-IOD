import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
// import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import {NoaccessComponent} from '@app/noaccess/noaccess.component'

import { StudyReviewContainerComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-container/study-review-container.component';
import { StudyReviewActionsComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-actions/study-review-actions.component';
import { StudyReviewComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-categories/study-review.component';

import { StudyReviewHistoryComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-history/study-review-history.component';
import { StudyReviewTimelineHistoryComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-timeline-history/study-review-timeline-history.component';
// import { ProjectIssueTrackerListComponent } from '@app/prism/study/study-review/project-issue-tracker/project-issue-tracker-list/project-issue-tracker-list.component';
// import { ProjectIssueTrackerEditComponent } from '@app/prism/study/study-review/project-issue-tracker/project-issue-tracker-edit/project-issue-tracker-edit.component';
// import { OfflineChecksComponent } from '@app/prism/study/study-review-tabs/study-review/study-offline-checks/offline-checks.component';
import { StudyOfflineIgnoreComponent } from '@app/prism/study/study-review-tabs/study-review/study-offline-ignore/study-offline-ignore.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';
import { StudyArchivedReviewGroupContainerComponent } from '../study-archived-review-group/study-archived-review-group-container/study-archived-review-group-container.component';
import { StudyReviewActionsViewComponent } from './study-review-actions-view/study-review-actions-view.component';
import { StudyReviewCategoriesViewComponent } from './study-review-categories-view/study-review-categories-view.component';
import { StudyOfflineViewComponent } from './study-offline-ignore-view/study-offline-ignore-view.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
const routes: Routes = [
  {
    path: '',
    component: StudyReviewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-off'
      },
      {
        path: 'sign-off',
        component: StudyReviewActionsComponent,
       
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        // data: {  debugMode : true }
      },
      {
        path: 'sign-off-view',
        component: StudyReviewActionsViewComponent
      },
      {
        path: 'review-categories',
        component: StudyReviewComponent,
        
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'review-categories-view',
        component: StudyReviewCategoriesViewComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      // {
      //   path: 'issue-tracker',
      //   component: ProjectIssueTrackerListComponent
      // },
      {
        path: 'issue-tracker',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker.module'
          ).then(m => m.ProjectIssueTrackerModule),
      },

      {
        path: 'issue-tracker-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker.module'
          ).then(m => m.ProjectIssueTrackerModule),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'review-history',
        component: StudyReviewHistoryComponent
      },
      {
        //commented code, uncommented for testing ComponentAccess - 04Mar2023
        path: 'timeline-history',
        component: StudyReviewTimelineHistoryComponent
      },
      // {
      //   path: 'offline-checks',
      //   component: OfflineChecksComponent,
      //   canDeactivate: [CanDeactivateGuard]
      // },
      {
        path: 'offline-checks',
        component: StudyOfflineIgnoreComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'offline-checks-view',
        component: StudyOfflineViewComponent
      },
      // {
      //   path: 'archived-reviews',
      //   component: StudyArchivedReviewGroupContainerComponent
      // },
      {
        path: 'archived-reviews',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-archived-review-group/study-archived-review-group.module'
          ).then(m => m.StudyArchivedReviewGroupModule)
      },
      {
        path : 'no-access-view',
        component: NoaccessComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyReviewRoutingModule {}
