import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdmsCppcRoutingModule } from './cdms-cppc-routing.module';
import { CdmsCppcContainerComponent } from './cdms-cppc-container/cdms-cppc-container.component';
import { CdmsCppcListComponent } from './cdms-cppc-list/cdms-cppc-list.component';
import { CdmsCppcEditComponent } from './cdms-cppc-edit/cdms-cppc-edit.component';

@NgModule({
  declarations: [CdmsCppcContainerComponent, CdmsCppcListComponent, CdmsCppcEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdmsCppcRoutingModule]
})
export class CdmsCppcModule {}
