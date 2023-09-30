import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsTrackersRoutingModule } from './cds-trackers-routing.module';
import { CdsTrackersContainerComponent } from './cds-trackers-container/cds-trackers-container.component';

@NgModule({
  declarations: [CdsTrackersContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsTrackersRoutingModule]
})
export class CdsTrackersModule {}
