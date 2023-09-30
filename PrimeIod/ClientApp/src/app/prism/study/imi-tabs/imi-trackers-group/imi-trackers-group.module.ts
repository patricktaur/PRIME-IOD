import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiTrackersGroupRoutingModule } from './imi-trackers-group-routing.module';
import { ImiTrackersGroupContainerComponent } from './imi-trackers-group-container/imi-trackers-group-container.component';

@NgModule({
  declarations: [ImiTrackersGroupContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiTrackersGroupRoutingModule]
})
export class ImiTrackersGroupModule {}
