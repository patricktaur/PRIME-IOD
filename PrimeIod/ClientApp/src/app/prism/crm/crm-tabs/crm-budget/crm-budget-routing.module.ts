import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmBudgetContainerComponent } from './crm-budget-container/crm-budget-container.component';
import { CrmBudgetListComponent } from './crm-budget-list/crm-budget-list.component';
import { CrmBudgetEditComponent } from './crm-budget-edit/crm-budget-edit.component';
import { CrmBudgetFilterComponent } from './crm-budget-filter/crm-budget-filter.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CrmBudgetContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CrmBudgetListComponent
      },
      {
        path: 'edit',
        component: CrmBudgetEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmBudgetRoutingModule {}
