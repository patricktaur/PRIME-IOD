import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsGroupSharedModule } from '../../cds-group-shared/cds-group-shared.module';

import { StudyCdsValTaskItemGroupRoutingModule } from './study-cds-val-task-item-group-routing.module';
import { StudyCdsValTaskItemGroupContainerComponent } from './study-cds-val-task-item-group-container/study-cds-val-task-item-group-container.component';
import { StudyCdsValTaskHistoryComponent } from './study-cds-val-task-history/study-cds-val-task-history.component';
import { StudyCdsValTaskViewComponent } from './study-cds-val-task-view/study-cds-val-task-view.component';

@NgModule({
  declarations: [
    StudyCdsValTaskItemGroupContainerComponent,
    StudyCdsValTaskHistoryComponent,
    StudyCdsValTaskViewComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsGroupSharedModule, StudyCdsValTaskItemGroupRoutingModule]
})
export class StudyCdsValTaskItemGroupModule {}
