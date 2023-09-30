import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ProcessImprovmentTrackersRoutingModule } from './process-improvement-trackers-routing.module';
import { ProcessImprovmentTrackersContainerComponent } from './process-improvement-trackers-container/process-improvement-trackers-container.component';

@NgModule({
  declarations: [ProcessImprovmentTrackersContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ProcessImprovmentTrackersRoutingModule]
})
export class ProcessImprovmentTrackersModule {}
