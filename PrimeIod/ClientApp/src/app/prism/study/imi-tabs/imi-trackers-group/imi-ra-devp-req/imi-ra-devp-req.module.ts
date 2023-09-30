import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaSharedCompsModule } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-shared-comps.module';
import { ImiRaDevpReqRoutingModule } from './imi-ra-devp-req-routing.module';
import { ImiRaDevpReqContainerComponent } from './imi-ra-devp-req-container/imi-ra-devp-req-container.component';
import { ImiRaReqListComponent } from './imi-ra-devp-req-list/imi-ra-devp-req-list.component';
import { ImiRaDevpReqFiltersComponent } from './imi-ra-devp-req-filters/imi-ra-devp-req-filters.component';

@NgModule({
  declarations: [ImiRaDevpReqContainerComponent, ImiRaReqListComponent, ImiRaDevpReqFiltersComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiRaSharedCompsModule, ImiRaDevpReqRoutingModule]
})
export class ImiRaDevpReqModule {}
