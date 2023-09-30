import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiCdmsGroupRoutingModule } from './imi-cdms-group-routing.module';
import { ImiCdmsGroupContainerComponent } from './imi-cdms-group-container/imi-cdms-group-container.component';
import { ImiStudyCdmsComponent } from './imi-study-cdms/imi-study-cdms.component';
import { ImiStudyCdmsViewComponent } from './imi-study-cdms-view/imi-study-cdms-view.component';

@NgModule({
  declarations: [ImiCdmsGroupContainerComponent, ImiStudyCdmsComponent, ImiStudyCdmsViewComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiCdmsGroupRoutingModule]
})
export class ImiCdmsGroupModule {}
