import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { StudyTimelineRoutingModule } from './study-timeline-routing.module';
import { StudyTimelineContainerComponent } from './study-timeline-container/study-timeline-container.component';
import { StudyTimelineComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline/study-timeline.component';
import { StudyTimelineViewComponent } from './study-timeline-view/study-timeline-view.component';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';

@NgModule({
  declarations: [StudyTimelineContainerComponent, StudyTimelineComponent, StudyTimelineViewComponent],
  imports: [CommonModule, 
    SharedModule,
    SharedCompsModule, 
    StudyTimelineRoutingModule]
})
export class StudyTimelineModule {}
