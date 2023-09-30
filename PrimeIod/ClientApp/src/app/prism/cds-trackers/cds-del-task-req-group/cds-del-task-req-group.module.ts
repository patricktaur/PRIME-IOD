import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { CdsDelTaskReqGroupRoutingModule } from './cds-del-task-req-group-routing.module';
import { CdsDelTaskReqGroupContainerComponent } from './cds-del-task-req-group-container/cds-del-task-req-group-container.component';
import { CdsDelTaskReqGroupListComponent } from './cds-del-task-req-group-list/cds-del-task-req-group-list.component';
import { CdsDelReqBaseListComponent } from './cds-del-req-base-list/cds-del-req-base-list.component';
import { CdsDelReqDashNListComponent } from './cds-del-req-dash-n-list/cds-del-req-dash-n-list.component';
// import { CdsDelTaskReqGroupEditComponent } from './cds-del-task-req-group-edit/cds-del-task-req-group-edit.component';

@NgModule({
  declarations: [
    CdsDelTaskReqGroupContainerComponent,
    CdsDelTaskReqGroupListComponent,
    CdsDelReqBaseListComponent,
    CdsDelReqDashNListComponent
    // CdsDelTaskReqGroupEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, CdsDelTaskReqGroupRoutingModule]
})
export class CdsDelTaskReqGroupModule {}
