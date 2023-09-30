import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { CdsInstTaskReqGroupRoutingModule } from './cds-inst-task-req-group-routing.module';
import { CdsInstTaskReqGroupContainerComponent } from './cds-inst-task-req-group-container/cds-inst-task-req-group-container.component';
import { CdsInstTaskReqGroupListComponent } from './cds-inst-task-req-group-list/cds-inst-task-req-group-list.component';
// import { CdsInstTaskReqGroupEditComponent } from './cds-inst-task-req-group-edit/cds-inst-task-req-group-edit.component';

@NgModule({
  declarations: [
    CdsInstTaskReqGroupContainerComponent,
    CdsInstTaskReqGroupListComponent
    // CdsInstTaskReqGroupEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, CdsInstTaskReqGroupRoutingModule]
})
export class CdsInstTaskReqGroupModule {}
