import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { CDSOutputTaskGroupRoutingModule } from './cds-output-task-req-group-routing.module';
import { CDSOutputTaskGroupContainerComponent } from './cds-output-task-req-group-container/cds-output-task-req-group-container.component';
import { CDSOutputTaskGroupListComponent } from './cds-output-task-req-group-list/cds-output-task-req-group-list.component';
import { CdsOutReqDashNListComponent } from './cds-out-req-dash-n-list/cds-out-req-dash-n-list.component';
import { CdsOutReqBaseListComponent } from './cds-out-req-base-list/cds-out-req-base-list.component';
// import { CDSOutputTaskGroupEditComponent } from './cds-output-task-req-group-edit/cds-output-task-req-group-edit.component';

@NgModule({
  declarations: [
    CDSOutputTaskGroupContainerComponent,
    CDSOutputTaskGroupListComponent,
    CdsOutReqDashNListComponent,
    CdsOutReqBaseListComponent

    // CDSOutputTaskGroupEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, CDSOutputTaskGroupRoutingModule]
})
export class CDSOutputTaskGroupModule {}
