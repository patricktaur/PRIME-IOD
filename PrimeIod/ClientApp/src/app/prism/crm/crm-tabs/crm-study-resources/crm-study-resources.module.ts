import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmStudyResourcesRoutingModule } from './crm-study-resources-routing.module';
import { CrmStudyResourcesContainerComponent } from './crm-study-resources-container/crm-study-resources-container.component';
import { CrmStudyResourcesListComponent } from './crm-study-resources-list/crm-study-resources-list.component';
import { CrmStudyResourcesEditComponent } from './crm-study-resources-edit/crm-study-resources-edit.component';

@NgModule({
  declarations: [CrmStudyResourcesContainerComponent, CrmStudyResourcesListComponent, CrmStudyResourcesEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmStudyResourcesRoutingModule]
})
export class CrmStudyResourcesModule {}
