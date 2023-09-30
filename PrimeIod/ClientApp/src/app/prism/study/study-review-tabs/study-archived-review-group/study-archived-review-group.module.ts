import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyArchivedReviewGroupRoutingModule } from './study-archived-review-group-routing.module';
import { StudyArchivedReviewGroupContainerComponent } from './study-archived-review-group-container/study-archived-review-group-container.component';
import { StudyReviewSignOffViewComponent } from './study-review-sign-off-view/study-review-sign-off-view.component';
import { StudyReviewIssueTrackerViewComponent } from './study-review-issue-tracker-view/study-review-issue-tracker-view.component';
import { StudyArchivedReviewHistoryComponent } from './study-archived-review-history/study-archived-review-history.component';

@NgModule({
  declarations: [
    StudyArchivedReviewGroupContainerComponent,
    StudyReviewSignOffViewComponent,
    StudyReviewIssueTrackerViewComponent,
    StudyArchivedReviewHistoryComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyArchivedReviewGroupRoutingModule]
})
export class StudyArchivedReviewGroupModule {}
