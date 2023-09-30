import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaTrackersGroupRoutingModule } from './imi-ra-trackers-routing.module';
import { ImiRaTrackersGroupContainerComponent } from './imi-ra-trackers-container/imi-ra-trackers-container.component';

@NgModule({
  declarations: [ImiRaTrackersGroupContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiRaTrackersGroupRoutingModule]
})
export class ImiRaTrackersGroupModule {}
