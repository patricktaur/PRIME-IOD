import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { StudyReviewContainerComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-container/study-review-container.component';
import { StudyReviewRoutingModule } from './study-review-routing.module';
import { StudyReviewActionsComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-actions/study-review-actions.component';
import { StudyReviewComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-categories/study-review.component';
// import { StudyReviewGroupComponent } from './study-review-group/study-review-group.component';
import { StudyReviewHistoryComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-history/study-review-history.component';
import { StudyReviewTimelineHistoryComponent } from '@app/prism/study/study-review-tabs/study-review/study-review-timeline-history/study-review-timeline-history.component';
import { StudyReviewActionsViewComponent } from './study-review-actions-view/study-review-actions-view.component';
import { StudyReviewCategoriesViewComponent } from './study-review-categories-view/study-review-categories-view.component';
import { StudyOfflineViewComponent } from './study-offline-ignore-view/study-offline-ignore-view.component';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
// import { ProjectIssueTrackerListComponent } from '@app/prism/study/study-review/project-issue-tracker/project-issue-tracker-list/project-issue-tracker-list.component';
// import { ProjectIssueTrackerEditComponent } from '@app/prism/study/study-review/project-issue-tracker/project-issue-tracker-edit/project-issue-tracker-edit.component';

@NgModule({
  declarations: [
    StudyReviewContainerComponent,
    StudyReviewActionsComponent,
    StudyReviewComponent,

    // StudyReviewGroupComponent,
    StudyReviewHistoryComponent,
    StudyReviewTimelineHistoryComponent,
    StudyReviewActionsViewComponent,
    StudyReviewCategoriesViewComponent,
    StudyOfflineViewComponent

    // ProjectIssueTrackerListComponent,
    // ProjectIssueTrackerEditComponent
  ],
  imports: [CommonModule, 
    SharedModule, 
    SharedCompsModule,
    RouterModule, StudyReviewRoutingModule]
})
export class StudyReviewModule {}
