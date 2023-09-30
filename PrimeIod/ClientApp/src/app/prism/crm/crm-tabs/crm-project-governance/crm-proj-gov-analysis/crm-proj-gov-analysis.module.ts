import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmProjGovAnalysisRoutingModule } from './crm-proj-gov-analysis-routing.module';
import { CrmProjGovAnalysisContainerComponent } from './crm-proj-gov-analysis-container/crm-proj-gov-analysis-container.component';


@NgModule({
  declarations: [
    CrmProjGovAnalysisContainerComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmProjGovAnalysisRoutingModule]
})
export class  CrmProjGovAnalysisModule {}
