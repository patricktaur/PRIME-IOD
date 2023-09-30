import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminCrmRoutingModule } from './admin-crm-routing.module';
import { AdminCrmContainerComponent } from './admin-crm-container/admin-crm-container.component';

import {CrmProjectGovernanceCodelistEditComponent} from './crm-project-governance-codelist/crm-project-governance-codelist-edit/crm-project-governance-codelist-edit.component';
import {CrmProjectGovernanceCodelistListComponent} from './crm-project-governance-codelist/crm-project-governance-codelist-list/crm-project-governance-codelist-list.component';
import {CrmProjectGovernanceCodelistFilterComponent} from './crm-project-governance-codelist/crm-project-governance-codelist-filter/crm-project-governance-codelist-filter.component';
import { CrmCodelistListComponent } from './crm-codelist/crm-codelist-list/crm-codelist-list.component';
import { CrmCodelistEditComponent } from './crm-codelist/crm-codelist-edit/crm-codelist-edit.component';
import { CrmCodelistFilterComponent } from './crm-codelist/crm-codelist-filter/crm-codelist-filter.component';
@NgModule({
  declarations: [
    AdminCrmContainerComponent,
    CrmProjectGovernanceCodelistEditComponent,
    CrmProjectGovernanceCodelistListComponent,
    CrmProjectGovernanceCodelistFilterComponent,
    CrmCodelistListComponent,
    CrmCodelistEditComponent,
    CrmCodelistFilterComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminCrmRoutingModule]
})
export class  AdminCrmModule {}
