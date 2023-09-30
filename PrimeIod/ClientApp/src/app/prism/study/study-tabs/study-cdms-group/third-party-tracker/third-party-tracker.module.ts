import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdmsSharedModule } from '@app/prism/study/study-tabs/study-cdms-group/cdms-shared/cdms-shared.module';

import { ThirdPartyTrackerRoutingModule } from './third-party-tracker-routing.module';
import { ThirdPartyTrackerListComponent } from './third-party-tracker-list/third-party-tracker-list.component';
import { ThirdPartyTrackerContainerComponent } from './third-party-tracker-container/third-party-tracker-container.component';

@NgModule({
  declarations: [ThirdPartyTrackerListComponent, ThirdPartyTrackerContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdmsSharedModule, ThirdPartyTrackerRoutingModule]
})
export class ThirdPartyTrackerModule {}
