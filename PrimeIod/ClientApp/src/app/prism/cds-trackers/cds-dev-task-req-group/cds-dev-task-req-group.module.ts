import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { CdsDevTaskReqGroupRoutingModule } from './cds-dev-task-req-group-routing.module';
import { CdsDevTaskReqGroupContainerComponent } from './cds-dev-task-req-group-container/cds-dev-task-req-group-container.component';
import { CdsDevTaskReqGroupListComponent } from './cds-dev-request-tracker-list/cds-dev-req-group-list.component';
import { CdsDevReqBaseListComponent } from './cds-dev-req-base-list/cds-dev-req-base-list.component';
import { CdsDevReqDashboardListComponent } from './cds-dev-req-dashboard-list/cds-dev-req-dashboard-list.component';

@NgModule({
  declarations: [
    CdsDevTaskReqGroupContainerComponent,
    CdsDevTaskReqGroupListComponent,
    CdsDevReqBaseListComponent,
    CdsDevReqDashboardListComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, CdsDevTaskReqGroupRoutingModule]
})
export class CdsDevTaskReqGroupModule {}
