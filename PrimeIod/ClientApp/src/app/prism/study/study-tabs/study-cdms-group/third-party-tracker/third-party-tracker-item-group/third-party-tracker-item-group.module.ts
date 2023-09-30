import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdmsSharedModule } from '@app/prism/study/study-tabs/study-cdms-group/cdms-shared/cdms-shared.module';

import { ThirdPartyTrackerItemGroupRoutingModule } from './third-party-tracker-item-group-routing.module';
import { ThirdPartyTrackerItemGroupContainerComponent } from './third-party-tracker-item-group-container/third-party-tracker-item-group-container.component';
import { ThirdPartyTrackerEditComponent } from './third-party-tracker-edit/third-party-tracker-edit.component';
import { ThirdPartyTrackerViewComponent } from './third-party-tracker-view/third-party-tracker-view.component';

@NgModule({
  declarations: [
    ThirdPartyTrackerItemGroupContainerComponent,
    ThirdPartyTrackerEditComponent,
    ThirdPartyTrackerViewComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdmsSharedModule, ThirdPartyTrackerItemGroupRoutingModule]
})
export class ThirdPartyTrackerItemGroupModule {}
