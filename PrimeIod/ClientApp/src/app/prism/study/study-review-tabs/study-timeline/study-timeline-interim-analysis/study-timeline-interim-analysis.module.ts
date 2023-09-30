import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyTimelineInterimAnalysisRoutingModule } from './study-timeline-interim-analysis-routing.module';
import { StudyTimelineInterimAnalysisContainerComponent } from './study-timeline-interim-analysis-container/study-timeline-interim-analysis-container.component';
import { StudyTimelineInterimAnalysisListComponent } from './study-timeline-interim-analysis-list/study-timeline-interim-analysis-list.component';
import { StudyTimelineInterimAnalysisEditComponent } from './study-timeline-interim-analysis-edit/study-timeline-interim-analysis-edit.component';

@NgModule({
  declarations: [
    StudyTimelineInterimAnalysisContainerComponent,
    StudyTimelineInterimAnalysisListComponent,
    StudyTimelineInterimAnalysisEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyTimelineInterimAnalysisRoutingModule]
})
export class StudyTimelineInterimAnalysisModule {}
