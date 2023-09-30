import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmTrackerFourRoutingModule } from './crm-tracker-four-routing.module';
import { CrmTrackerFourContainerComponent } from './crm-tracker-four-container/crm-tracker-four-container.component';
import { CrmTrackerFourListComponent } from './crm-tracker-four-list/crm-tracker-four-list.component';
import { CrmTrackerFourEditComponent } from './crm-tracker-four-edit/crm-tracker-four-edit.component';

@NgModule({
  declarations: [CrmTrackerFourContainerComponent, CrmTrackerFourListComponent, CrmTrackerFourEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmTrackerFourRoutingModule]
})
export class CrmTrackerFourModule {}
