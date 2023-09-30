import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
/*
ERROR in src/app/prism/cds-trackers/cds-coding-task-req-group/cds-coding-task-req-group-list/cds-coding-task-req-group-list.component.html:6:7 - error NG8001: 'app-cds-coding-filter' is not a known element:
To be resolved.
workaround: filters declared in SharedCompsModule
*/

import { CdsDevReqDashboardComponent } from './dashboards/cds-dev-req-dashboard/cds-dev-req-dashboard.component';
import { CdsOutputDueDashboardComponent } from '../cds-shared-comps/dashboards/cds-output-due-dashboard/cds-output-due-dashboard.component';
import { CdsDelyDueDashboardComponent } from './dashboards/cds-dely-due-dashboard/cds-dely-due-dashboard.component';
import { CdsBatchActionsComponent } from './cds-batch-actions/cds-batch-actions.component';
import { BatchActionService } from '@app/prism/cds-trackers/cds-shared-comps/batch-action.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@NgModule({
  declarations: [
    CdsDevReqDashboardComponent,
    CdsOutputDueDashboardComponent,
    CdsDelyDueDashboardComponent,
    CdsBatchActionsComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule],
  exports: [
    CdsDevReqDashboardComponent,
    CdsOutputDueDashboardComponent,
    CdsDelyDueDashboardComponent,
    CdsBatchActionsComponent
  ],
  providers: [
    { provide: 'cds-development-server-response', useClass: ServerResponseService },

    { provide: 'cds-output-batch-actions', useClass: BatchActionService },
    { provide: 'cds-output-server-response', useClass: ServerResponseService },
    { provide: 'cds-delivery-batch-actions', useClass: BatchActionService },
    { provide: 'cds-delivery-server-response', useClass: ServerResponseService },
    { provide: 'cds-coding-server-response', useClass: ServerResponseService },
    { provide: 'cds-validation-server-response', useClass: ServerResponseService },
    { provide: 'cds-instruction-server-response', useClass: ServerResponseService }
  ]
})
export class CdsSharedCompsModule {}
