import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmMenuComponent } from '@app/prism/crm/crm-shared/crm-menu/crm-menu.component';
import { StudyCrmDashboardComponent } from '@app/prism/crm/crm-shared/study-dashboards/study-crm-dashboard/study-crm-dashboard.component';
import { CrmListComponent } from './crm-list/crm-list/crm-list.component';
import { CrmListFiltersComponent } from './crm-list/crm-list-filters/crm-list-filters.component';
import { CrmListService } from './crm-list/crm-list.service';
@NgModule({
  declarations: [StudyCrmDashboardComponent, CrmMenuComponent, CrmListComponent, CrmListFiltersComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule],
  exports: [StudyCrmDashboardComponent, CrmMenuComponent],
  providers: [CrmListService]
})
export class CrmSharedModule {}
