import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsGroupSharedModule } from '../../cds-group-shared/cds-group-shared.module';

import { StudyCdsDeliveryTaskItemGroupRoutingModule } from './study-cds-delivery-task-item-group-routing.module';
import { StudyCdsDeliveryTaskItemGroupContainerComponent } from './study-cds-delivery-task-item-group-container/study-cds-del-task-item-group-container.component';
import { StudyCdsDelTaskHistoryComponent } from './study-cds-del-task-history/study-cds-del-task-history.component';
import { StudyCdsDelTaskViewComponent } from './study-cds-del-task-view/study-cds-del-task-view.component';

@NgModule({
  declarations: [
    StudyCdsDeliveryTaskItemGroupContainerComponent,
    StudyCdsDelTaskHistoryComponent,
    StudyCdsDelTaskViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    CdsGroupSharedModule,
    StudyCdsDeliveryTaskItemGroupRoutingModule
  ]
})
export class StudyCdsDeliveryTaskItemGroupModule {}
