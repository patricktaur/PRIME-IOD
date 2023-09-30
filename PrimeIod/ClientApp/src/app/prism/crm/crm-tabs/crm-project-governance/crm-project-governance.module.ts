import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmProjectGovernanceRoutingModule } from './crm-project-governance-routing.module';
import { CrmProjectGovernanceContainerComponent } from './crm-project-governance-container/crm-project-governance-container.component';
import { CrmProjGovEditComponent } from './crm-proj-gov-edit/crm-proj-gov-edit.component';
import { CrmProjGovViewComponent } from './crm-proj-gov-view/crm-proj-gov-view.component';
import { CrmProjGovReviewComponent } from './crm-proj-gov-review/crm-proj-gov-review.component';
import { CrmProjGovCurrentViewComponent } from './crm-proj-gov-current-view/crm-proj-gov-current-view.component';

@NgModule({
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmProjectGovernanceRoutingModule],
  declarations: [
    CrmProjectGovernanceContainerComponent,
    CrmProjGovEditComponent,
    CrmProjGovViewComponent,
    CrmProjGovReviewComponent,
    CrmProjGovCurrentViewComponent
  ]
})
export class CrmProjectGovernanceModule {}
