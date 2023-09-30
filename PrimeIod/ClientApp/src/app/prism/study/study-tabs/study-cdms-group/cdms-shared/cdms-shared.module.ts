import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, SharedCompsModule],
  providers: [
    { provide: 'cdms-tracker', useClass: ServerResponseService },
    { provide: 'cdms-third-party-tracker', useClass: ServerResponseService }
  ]
})
export class CdmsSharedModule {}
