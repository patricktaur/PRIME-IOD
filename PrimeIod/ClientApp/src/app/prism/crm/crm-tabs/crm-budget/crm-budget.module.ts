import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmBudgetRoutingModule } from './crm-budget-routing.module';
import { CrmBudgetContainerComponent } from './crm-budget-container/crm-budget-container.component';
import { CrmBudgetListComponent } from './crm-budget-list/crm-budget-list.component';
import { CrmBudgetEditComponent } from './crm-budget-edit/crm-budget-edit.component';
import { CrmBudgetFilterComponent } from './crm-budget-filter/crm-budget-filter.component';
import { CrmBudgetEditService } from '../crm-budget-edit.service';

@NgModule({
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmBudgetRoutingModule],
  declarations: [CrmBudgetContainerComponent, CrmBudgetListComponent, CrmBudgetEditComponent, CrmBudgetFilterComponent],
  providers: [{ provide: 'budget-server-response', useClass: CrmBudgetEditService }]
})
export class CrmBudgetModule {}
