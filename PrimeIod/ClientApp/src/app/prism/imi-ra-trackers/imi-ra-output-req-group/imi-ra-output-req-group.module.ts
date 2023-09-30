import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaSharedCompsModule } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-shared-comps.module';

import { ImiRaOutputReqGroupRoutingModule } from './imi-ra-output-req-group-routing.module';
import { ImiRaOutputReqGroupContainerComponent } from './imi-ra-output-req-group-container/imi-ra-output-req-group-container.component';
import { ImiRaOutputReqListComponent } from './imi-ra-output-req-list/imi-ra-output-req-list.component';
import { ImiRaOutputReqFiltersComponent } from './imi-ra-output-req-filters/imi-ra-output-req-filters.component';

@NgModule({
  declarations: [ImiRaOutputReqGroupContainerComponent, ImiRaOutputReqListComponent, ImiRaOutputReqFiltersComponent],
  imports: [CommonModule, SharedModule, ImiRaSharedCompsModule, SharedCompsModule, ImiRaOutputReqGroupRoutingModule],
  exports: [ImiRaOutputReqFiltersComponent]
})
export class ImiRaOutputReqGroupModule {}
