import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaSharedCompsModule } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-shared-comps.module';
import { ImiTrackerGroupSharedModule } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-tracker-group-shared/imi-tracker-group-shared.module';

import { ImiRaDevpReqItemGroupRoutingModule } from './imi-ra-devp-req-item-group-routing.module';
import { ImiRaDevpReqItemGroupContainerComponent } from './imi-ra-devp-req-item-group-container/imi-ra-devp-req-item-group-container.component';
import { ImiRaDevpReqViewComponent } from './imi-ra-devp-req-view/imi-ra-devp-req-view.component';
import { ImiRaDevpReqEditComponent } from './imi-ra-devp-req-edit/imi-ra-devp-req-edit.component';

@NgModule({
  declarations: [ImiRaDevpReqItemGroupContainerComponent, ImiRaDevpReqViewComponent, ImiRaDevpReqEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    ImiRaSharedCompsModule,
    ImiTrackerGroupSharedModule,
    ImiRaDevpReqItemGroupRoutingModule
  ]
})
export class ImiRaDevpReqItemGroupModule {}
