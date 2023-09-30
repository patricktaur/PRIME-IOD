import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiCdmsSharedModule } from '@app/prism/study/imi-tabs/imi-cdms-group/imi-cdms-shared/imi-cdms-shared.module';

import { ImiStudyCdmsTrackerRoutingModule } from './imi-study-cdms-tracker-routing.module';
import { ImiStudyCdmsTrackerContainerComponent } from './imi-study-cdms-tracker-container/imi-study-cdms-tracker-container.component';
import { ImiStudyCdmsTrackerListComponent } from './imi-study-cdms-tracker-list/imi-study-cdms-tracker-list.component';
import { ImiStudyCdmsTrackerEditComponent } from './imi-study-cdms-tracker-item-group/imi-study-cdms-tracker-edit/imi-study-cdms-tracker-edit.component';

@NgModule({
  declarations: [
    ImiStudyCdmsTrackerContainerComponent,
    ImiStudyCdmsTrackerListComponent,
    ImiStudyCdmsTrackerEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiCdmsSharedModule, ImiStudyCdmsTrackerRoutingModule]
})
export class ImiStudyCdmsTrackerModule {}
