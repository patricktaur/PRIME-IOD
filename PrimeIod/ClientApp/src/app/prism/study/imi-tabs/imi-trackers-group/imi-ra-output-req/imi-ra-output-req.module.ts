import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaOutputReqRoutingModule } from './imi-ra-output-req-routing.module';
import { ImiRaOutputReqContainerComponent } from './imi-ra-output-req-container/imi-ra-output-req-container.component';
import { ImiRaOuputReqListComponent } from './imi-ra-ouput-req-list/imi-ra-ouput-req-list.component';
import { ImiRaOutputReqFiltersComponent } from './imi-ra-output-req-filters/imi-ra-output-req-filters.component';
import { ImiRaSharedCompsModule } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-shared-comps.module';

@NgModule({
  declarations: [ImiRaOutputReqContainerComponent, ImiRaOuputReqListComponent, ImiRaOutputReqFiltersComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiRaSharedCompsModule, ImiRaOutputReqRoutingModule]
})
export class ImiRaOutputReqModule {}
