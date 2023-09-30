import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyTimelineInterimLocksRoutingModule } from './study-timeline-interim-locks-routing.module';
import { StudyTimelineInterimLocksContainerComponent } from './study-timeline-interim-locks-container/study-timeline-interim-locks-container.component';
import { StudyTimelineInterimLocksListComponent } from './study-timeline-interim-locks-list/study-timeline-interim-locks-list.component';
import { StudyTimelineInterimLocksEditComponent } from './study-timeline-interim-locks-edit/study-timeline-interim-locks-edit.component';

@NgModule({
  declarations: [
    StudyTimelineInterimLocksContainerComponent,
    StudyTimelineInterimLocksListComponent,
    StudyTimelineInterimLocksEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyTimelineInterimLocksRoutingModule]
})
export class StudyTimelineInterimLocksModule {}
