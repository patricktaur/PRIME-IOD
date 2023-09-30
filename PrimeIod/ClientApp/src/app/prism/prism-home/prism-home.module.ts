import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';
import { PrismHomeRoutingModule } from './prism-home-routing.module';
import { PrismHomeContainerComponent } from './prism-home-container/prism-home-container.component';
import { StudyListComponent } from '@app/prism/prism-home/study-list/study-list.component';
import { HomeCdsDashboardsComponent } from './home-cds-dashboards/home-cds-dashboards.component';
import { ImiStudyListComponent } from './imi-study-list/imi-study-list.component';
import { StudyMembersComponent } from './study-members/study-members.component';
import { CrmListComponent } from './crm-list/crm-list.component';
import { CrmPopoverComponent } from './crm-list/crm-popover.component';
@NgModule({
  declarations: [
    PrismHomeContainerComponent,
    StudyListComponent,
    HomeCdsDashboardsComponent,
    ImiStudyListComponent,
    StudyMembersComponent,
    CrmListComponent,
    CrmPopoverComponent
  ],
  imports: [CommonModule, SharedModule, CdsSharedCompsModule, PrismHomeRoutingModule, SharedCompsModule]
})
export class PrismHomeModule {}
