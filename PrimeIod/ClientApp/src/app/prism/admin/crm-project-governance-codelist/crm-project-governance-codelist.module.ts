import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedCompsModule } from "@app/prism/shared-comps/shared-comps.module";
import { SharedModule } from "@app/shared";
import { CrmProjectGovernanceCodelistContainerComponent } from './crm-project-governance-codelist-container/crm-project-governance-codelist-container.component';
// import { CrmProjectGovernanceCodelistListComponent } from './crm-project-governance-codelist-list/crm-project-governance-codelist-list.component';
// import { CrmProjectGovernanceCodelistEditComponent } from './crm-project-governance-codelist-edit/crm-project-governance-codelist-edit.component';
import { CrmProjectGovernanceCodelistRoutingModule } from "./crm-project-governance-codelist-routing.module";
// import { CrmProjectGovernanceCodelistFilterComponent } from './crm-project-governance-codelist-filter/crm-project-governance-codelist-filter.component';

@NgModule({
	declarations: [
        CrmProjectGovernanceCodelistContainerComponent,
        // CrmProjectGovernanceCodelistListComponent,
        // CrmProjectGovernanceCodelistEditComponent,
        // CrmProjectGovernanceCodelistFilterComponent
    ],
	imports: [
		CommonModule,
		SharedModule,
		SharedCompsModule,
        CrmProjectGovernanceCodelistRoutingModule
	]
})
export class CrmProjectGovernanceCodelistModule {}