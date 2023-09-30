import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyQualityReviewRoutingModule } from './study-quality-review-routing.module';
import { StudyQualityReviewContainerComponent } from './study-quality-review-container/study-quality-review-container.component';
import { StudyQualityReviewListComponent } from './study-quality-review-list/study-quality-review-list.component';
import { StudyQualityReviewEditComponent } from './study-quality-review-edit/study-quality-review-edit.component';
import { StudyQualityReviewRequiredEditComponent } from './study-quality-review-required-edit/study-quality-review-required-edit.component';
import { StudyQualityReviewRequiredViewComponent } from './study-quality-review-required-view/study-quality-review-required-view.component';
@NgModule({
  declarations: [
    StudyQualityReviewContainerComponent,
    StudyQualityReviewListComponent,
    StudyQualityReviewEditComponent,
    StudyQualityReviewRequiredEditComponent,
    StudyQualityReviewRequiredViewComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyQualityReviewRoutingModule]
})
export class StudyQualityReviewModule {}
