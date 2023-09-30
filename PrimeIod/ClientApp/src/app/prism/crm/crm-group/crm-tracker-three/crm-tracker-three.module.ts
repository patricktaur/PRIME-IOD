import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmTrackerThreeRoutingModule } from './crm-tracker-three-routing.module';
import { CrmTrackerThreeContainerComponent } from './crm-tracker-three-container/crm-tracker-three-container.component';
import { CrmTrackerThreeListComponent } from './crm-tracker-three-list/crm-tracker-three-list.component';
import { CrmTrackerThreeEditComponent } from './crm-tracker-three-edit/crm-tracker-three-edit.component';

@NgModule({
  declarations: [CrmTrackerThreeContainerComponent, CrmTrackerThreeListComponent, CrmTrackerThreeEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmTrackerThreeRoutingModule]
})
export class CrmTrackerThreeModule {}
