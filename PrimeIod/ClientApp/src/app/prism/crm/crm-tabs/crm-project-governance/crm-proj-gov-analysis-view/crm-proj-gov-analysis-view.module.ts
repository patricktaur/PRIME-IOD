import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmProjGovAnalysisViewRoutingModule } from './crm-proj-gov-analysis-view-routing.module';
import { CrmProjGovAnalysisViewContainerComponent } from './crm-proj-gov-analysis-view-container/crm-proj-gov-analysis-view-container.component';


@NgModule({
  declarations: [
    CrmProjGovAnalysisViewContainerComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmProjGovAnalysisViewRoutingModule]
})
export class  CrmProjGovAnalysisViewModule {}
