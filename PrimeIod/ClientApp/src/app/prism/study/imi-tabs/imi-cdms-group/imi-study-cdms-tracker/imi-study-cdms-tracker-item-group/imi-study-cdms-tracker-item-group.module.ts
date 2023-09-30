import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiCdmsSharedModule } from '@app/prism/study/imi-tabs/imi-cdms-group/imi-cdms-shared/imi-cdms-shared.module';
import { ImiStudyCdmsTrackerItemGroupRoutingModule } from './imi-study-cdms-tracker-item-group-routing.module';
import { ImiStudyCdmsTrackerItemGroupContainerComponent } from './imi-study-cdms-tracker-item-group-container/imi-study-cdms-tracker-item-group-container.component';
import { ImiStudyCdmsTrackerViewComponent } from './imi-study-cdms-tracker-view/imi-study-cdms-tracker-view.component';

@NgModule({
  declarations: [ImiStudyCdmsTrackerItemGroupContainerComponent, ImiStudyCdmsTrackerViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    ImiCdmsSharedModule,
    ImiStudyCdmsTrackerItemGroupRoutingModule
  ]
})
export class ImiStudyCdmsTrackerItemGroupModule {}
