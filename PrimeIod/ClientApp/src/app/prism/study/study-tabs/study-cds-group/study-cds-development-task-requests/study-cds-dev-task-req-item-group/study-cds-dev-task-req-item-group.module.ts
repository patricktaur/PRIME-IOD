import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyCdsDevTaskReqItemGroupRoutingModule } from './study-cds-dev-task-req-item-group-routing.module';
import { CdsGroupSharedModule } from '../../cds-group-shared/cds-group-shared.module';
import { StudyCdsDevTaskReqItemGroupContainerComponent } from './study-cds-dev-task-req-item-group-container/study-cds-dev-itm-grp-cont.component';
import { StudyCdsDevTaskReqViewComponent } from './study-cds-dev-task-req-view/study-cds-dev-task-req-view.component';
import { StudyCdsDevTaskReqHistoryComponent } from './study-cds-dev-task-req-history/study-cds-dev-task-req-history.component';

@NgModule({
  declarations: [
    StudyCdsDevTaskReqItemGroupContainerComponent,
    StudyCdsDevTaskReqViewComponent,
    StudyCdsDevTaskReqHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    CdsGroupSharedModule,
    StudyCdsDevTaskReqItemGroupRoutingModule
  ]
})
export class StudyCdsDevTaskReqItemGroupModule {}
