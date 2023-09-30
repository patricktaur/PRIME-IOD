import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { CdsValTaskReqGroupRoutingModule } from './cds-val-task-req-group-routing.module';
import { CdsValTaskReqGroupContainerComponent } from './cds-val-task-req-group-container/cds-val-task-req-group-container.component';
import { CdsValTaskListComponent } from './cds-val-task-list/cds-val-task-list.component';

@NgModule({
  declarations: [CdsValTaskReqGroupContainerComponent, CdsValTaskListComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, CdsValTaskReqGroupRoutingModule]
})
export class CdsValTaskReqGroupModule {}
