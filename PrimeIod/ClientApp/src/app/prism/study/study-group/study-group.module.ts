import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';

import { StudyGroupRoutingModule } from './study-group-routing.module';
import { StudyGroupContainerComponent } from './study-group-container/study-group-container.component';
import { CrmTabsModule } from '@app/prism/crm/crm-tabs/crm-tabs.module';
import { StudyDashboardContainerComponent } from './study-dashboard-container/study-dashboard-container.component';
@NgModule({
  declarations: [StudyGroupContainerComponent, StudyDashboardContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyGroupRoutingModule, CrmTabsModule]
})
export class StudyGroupModule {
  constructor() {}
}
