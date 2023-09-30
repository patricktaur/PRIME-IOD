import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmProjGovOnGoingViewRoutingModule } from './crm-proj-gov-on-going-view-routing.module';
import { CrmProjGovOnGoingViewContainerComponent } from './crm-proj-gov-on-going-view-container/crm-proj-gov-on-going-view-container.component';


@NgModule({
  declarations: [
    CrmProjGovOnGoingViewContainerComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmProjGovOnGoingViewRoutingModule]
})
export class  CrmProjGovOnGoingViewModule {}
