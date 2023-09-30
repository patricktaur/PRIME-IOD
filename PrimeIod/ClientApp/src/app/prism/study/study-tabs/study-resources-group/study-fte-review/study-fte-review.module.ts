import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyFteReviewRoutingModule } from './study-fte-review-routing.module';
import { StudyFteReviewContainerComponent } from './study-fte-review-container/study-fte-review-container.component';
import { StudyFteReviewListComponent } from './study-fte-review-list/study-fte-review-list.component';
import { StudyFteReviewEditComponent } from './study-fte-review-edit/study-fte-review-edit.component';
import { StudyFteReviewAveragesDashboardComponent } from './study-fte-review-averages-dashboard/study-fte-review-averages-dashboard.component';
import { StudyFteReviewAveragesListComponent } from './study-fte-review-averages-list/study-fte-review-averages-list.component';

@NgModule({
  declarations: [
    StudyFteReviewContainerComponent,
    StudyFteReviewListComponent,
    StudyFteReviewEditComponent,
    StudyFteReviewAveragesDashboardComponent,
    StudyFteReviewAveragesListComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyFteReviewRoutingModule]
})
export class StudyFteReviewModule {}
