import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { StudyDescriptionComponent } from './study-details-container/study-description/study-description.component';
import { StudyAssumptionsComponent } from './study-details-container/study-assumptions/study-assumptions.component';
// import { StudyStatusComponent } from './study-status/study-status.component';
// import { StudyPageflowComponent } from './study-pageflow/study-pageflow.component';
// import { StudyPageFlowComponent } from './study-page-flow/study-page-flow.component';

@NgModule({
  declarations: [
    // StudyDescriptionComponent,
    // StudyAssumptionsComponent,
    // StudyStatusComponent,
    // StudyPageFlowComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class StudyReviewTabsModule {}
