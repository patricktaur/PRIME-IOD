import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsGroupSharedModule } from '../../cds-group-shared/cds-group-shared.module';

import { StudyCdsCodingTaskItemGroupRoutingModule } from './study-cds-coding-task-item-group-routing.module';
import { StudyCdsCodingTaskItemGroupContainerComponent } from './study-cds-coding-task-item-group-container/study-cds-coding-task-item-group-container.component';
import { TudyCdsCodingTaskHistoryComponent } from './tudy-cds-coding-task-history/tudy-cds-coding-task-history.component';
import { StudyCdsCodingTaskViewComponent } from './tudy-cds-coding-task-view/tudy-cds-coding-task-view.component';

@NgModule({
  declarations: [
    StudyCdsCodingTaskItemGroupContainerComponent,
    TudyCdsCodingTaskHistoryComponent,
    StudyCdsCodingTaskViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    CdsGroupSharedModule,
    StudyCdsCodingTaskItemGroupRoutingModule
  ]
})
export class StudyCdsCodingTaskItemGroupModule {}
