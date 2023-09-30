import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsGroupSharedModule } from '../../cds-group-shared/cds-group-shared.module';

import { StudyCdsInstTaskItemGroupRoutingModule } from './study-cds-inst-task-item-group-routing.module';
import { StudyCdsInstTaskItemGroupContainerComponent } from './study-cds-inst-task-item-group-container/study-cds-inst-task-item-group-container.component';
import { StudyCdsInstTaskHistoryComponent } from './study-cds-inst-task-history/study-cds-inst-task-history.component';
import { StudyCdsInstTaskViewComponent } from './study-cds-inst-task-view/study-cds-inst-task-view.component';
import { StudyCdsInstTaskViewShellComponent } from './study-cds-inst-task-view-shell/study-cds-inst-task-view-shell.component';
import { StudyCdsInstSelectTaskComponent } from './study-cds-inst-select-task/study-cds-inst-select-task.component';

@NgModule({
  declarations: [
    StudyCdsInstTaskItemGroupContainerComponent,
    StudyCdsInstTaskHistoryComponent,
    StudyCdsInstTaskViewComponent,
    StudyCdsInstTaskViewShellComponent,
    StudyCdsInstSelectTaskComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsGroupSharedModule, StudyCdsInstTaskItemGroupRoutingModule]
})
export class StudyCdsInstTaskItemGroupModule {}
