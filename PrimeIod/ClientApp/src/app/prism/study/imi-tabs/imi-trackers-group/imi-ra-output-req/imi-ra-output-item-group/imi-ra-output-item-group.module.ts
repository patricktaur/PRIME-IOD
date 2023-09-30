import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaSharedCompsModule } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-shared-comps.module';
import { ImiTrackerGroupSharedModule } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-tracker-group-shared/imi-tracker-group-shared.module';

import { ImiRaOutputReqItemGroupRoutingModule } from './imi-ra-output-item-group-routing.module';
import { ImiRaOutputReqItemGroupContainerComponent } from './imi-ra-output-item-group-container/imi-ra-output-item-group-container.component';
import { ImiRaOutputReqViewComponent } from './imi-ra-output-req-view/imi-ra-output-req-view.component';
import { ImiRaOutputReqEditComponent } from './imi-ra-output-req-edit/imi-ra-output-req-edit.component';

@NgModule({
  declarations: [ImiRaOutputReqItemGroupContainerComponent, ImiRaOutputReqViewComponent, ImiRaOutputReqEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    ImiRaSharedCompsModule,
    ImiTrackerGroupSharedModule,
    ImiRaOutputReqItemGroupRoutingModule
  ]
})
export class ImiRaOutputReqItemGroupModule {}
