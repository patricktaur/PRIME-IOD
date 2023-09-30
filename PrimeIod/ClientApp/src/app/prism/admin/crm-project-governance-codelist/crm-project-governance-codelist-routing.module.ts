import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrmProjGovAnalysisContainerComponent } from "@app/prism/crm/crm-tabs/crm-project-governance/crm-proj-gov-analysis/crm-proj-gov-analysis-container/crm-proj-gov-analysis-container.component";
// import { CrmProjectGovernanceCodelistListComponent } from "./crm-project-governance-codelist-list/crm-project-governance-codelist-list.component";
// import { CrmProjectGovernanceCodelistEditComponent } from "./crm-project-governance-codelist-edit/crm-project-governance-codelist-edit.component";
import { CrmProjectGovernanceCodelistContainerComponent } from "./crm-project-governance-codelist-container/crm-project-governance-codelist-container.component";

const routes: Routes = [{
    path: '',
    component: CrmProjectGovernanceCodelistContainerComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
        }, 
        // {
        //     path: 'list',
        //     component: CrmProjectGovernanceCodelistListComponent
        // },
        // {
        //     path: 'edit',
        //     component: CrmProjectGovernanceCodelistEditComponent
        // }
    ]  
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CrmProjectGovernanceCodelistRoutingModule {}