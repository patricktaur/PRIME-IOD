import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaSharedCompsModule } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-shared-comps.module';

import { ImiRaDevReqGroupRoutingModule } from './imi-ra-dev-req-group-routing.module';
import { ImiRaDevReqGroupContainerComponent } from './imi-ra-dev-req-group-container/imi-ra-dev-req-group-container.component';
import { ImiRaDevReqListComponent } from './imi-ra-dev-req-list/imi-ra-dev-req-list.component';
import { ImiRaDevReqFiltersComponent } from './imi-ra-dev-req-filters/imi-ra-dev-req-filters.component';

@NgModule({
  declarations: [ImiRaDevReqGroupContainerComponent, ImiRaDevReqListComponent, ImiRaDevReqFiltersComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiRaSharedCompsModule, ImiRaDevReqGroupRoutingModule],
  exports: [ImiRaDevReqFiltersComponent]
})
export class ImiRaDevReqGroupModule {}
