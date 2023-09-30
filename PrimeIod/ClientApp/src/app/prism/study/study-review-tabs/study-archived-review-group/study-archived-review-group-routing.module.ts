import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyArchivedReviewGroupContainerComponent } from './study-archived-review-group-container/study-archived-review-group-container.component';
import { StudyReviewSignOffViewComponent } from './study-review-sign-off-view/study-review-sign-off-view.component';
import { StudyReviewIssueTrackerViewComponent } from './study-review-issue-tracker-view/study-review-issue-tracker-view.component';
import { StudyArchivedReviewHistoryComponent } from './study-archived-review-history/study-archived-review-history.component';
import { StudyReviewTimelineHistoryComponent } from '../study-review/study-review-timeline-history/study-review-timeline-history.component';
const routes: Routes = [
  {
    path: '',
    component: StudyArchivedReviewGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'project-review-sign-off'
      },

      {
        path: 'project-review-sign-off',
        component: StudyReviewSignOffViewComponent
      },
      {
        path: 'project-issue-list',
        component: StudyReviewIssueTrackerViewComponent
      },

      {
        path: 'archived-project-review-history',
        component: StudyArchivedReviewHistoryComponent
      },
      {
        path: 'timeline-history',
        component: StudyReviewTimelineHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyArchivedReviewGroupRoutingModule {}
