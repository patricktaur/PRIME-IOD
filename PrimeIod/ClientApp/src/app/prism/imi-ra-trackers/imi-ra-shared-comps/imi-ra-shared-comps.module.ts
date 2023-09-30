import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiRaBatchActionsComponent } from './imi-ra-batch-actions/imi-ra-batch-actions.component';

import { ImiRaBatchActionService } from '@app/prism/imi-ra-trackers/imi-ra-shared-comps/imi-ra-batch-action.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@NgModule({
  declarations: [ImiRaBatchActionsComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule],
  exports: [ImiRaBatchActionsComponent],
  providers: [
    { provide: 'imi-ra-development-server-response', useClass: ServerResponseService },
    { provide: 'imi-ra-development-batch-actions', useClass: ImiRaBatchActionService },
    { provide: 'imi-ra-output-server-response', useClass: ServerResponseService },
    { provide: 'imi-ra-output-batch-actions', useClass: ImiRaBatchActionService }
  ]
})
export class ImiRaSharedCompsModule {}
