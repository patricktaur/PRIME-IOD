import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { StudyCDSDeliveryTaskRoutingModule } from './study-cds-delivery-task-routing.module';
import { StudyCDSDeliveryTaskContainerComponent } from './study-cds-delivery-task-container/study-cds-delivery-task-container.component';
import { StudyCDSDeliveryTaskListComponent } from './study-cds-delivery-task-list/study-cds-delivery-task-list.component';
import { StudyCDSDeliveryTaskEditComponent } from './study-cds-delivery-task-item-group/study-cds-delivery-task-edit/study-cds-delivery-task-edit.component';
import { StudyCdsDelTaskFiltersComponent } from './study-cds-del-task-filters/study-cds-del-task-filters.component';

@NgModule({
  declarations: [
    StudyCDSDeliveryTaskContainerComponent,
    StudyCDSDeliveryTaskListComponent,
    StudyCDSDeliveryTaskEditComponent,
    StudyCdsDelTaskFiltersComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, StudyCDSDeliveryTaskRoutingModule]
})
export class StudyCDSDeliveryTaskModule {}
