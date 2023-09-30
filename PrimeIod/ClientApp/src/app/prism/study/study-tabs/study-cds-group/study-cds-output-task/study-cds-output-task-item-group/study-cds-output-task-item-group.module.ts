import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsGroupSharedModule } from '../../cds-group-shared/cds-group-shared.module';

import { StudyCdsOutputTaskItemGroupRoutingModule } from './study-cds-output-task-item-group-routing.module';
import { StudyCdsOutputTaskItemGroupContainerComponent } from './study-cds-output-task-item-group-container/study-cds-output-task-item-group-container.component';
import { StudyCdsOutputTaskHistoryComponent } from './study-cds-output-task-history/study-cds-output-task-history.component';
import { StudyCdsOutputTaskViewComponent } from './study-cds-output-task-view/study-cds-output-task-view.component';

@NgModule({
  declarations: [
    StudyCdsOutputTaskItemGroupContainerComponent,
    StudyCdsOutputTaskHistoryComponent,
    StudyCdsOutputTaskViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    CdsGroupSharedModule,
    StudyCdsOutputTaskItemGroupRoutingModule
  ]
  // providers:[
  //   {provide:'cds-output', useClass: ServerResponseService}
  // ]
})
export class StudyCdsOutputTaskItemGroupModule {}
