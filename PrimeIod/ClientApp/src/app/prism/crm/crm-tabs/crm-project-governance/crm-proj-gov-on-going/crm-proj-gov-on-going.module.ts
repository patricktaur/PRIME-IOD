import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmProjGovOnGoingRoutingModule } from './crm-proj-gov-on-going-routing.module';
import { CrmProjGovOnGoingContainerComponent } from './crm-proj-gov-on-going-container/crm-proj-gov-on-going-container.component';


@NgModule({
  declarations: [
    CrmProjGovOnGoingContainerComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmProjGovOnGoingRoutingModule]
})
export class  CrmProjGovOnGoingModule {}
