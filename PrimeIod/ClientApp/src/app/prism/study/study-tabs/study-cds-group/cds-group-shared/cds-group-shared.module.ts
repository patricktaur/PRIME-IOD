import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { CdsReqItemDashboardComponent } from './cds-req-item-dashboard/cds-req-item-dashboard.component';

@NgModule({
  declarations: [CdsReqItemDashboardComponent],
  imports: [CommonModule, SharedModule],
  exports: [CdsReqItemDashboardComponent]
})
export class CdsGroupSharedModule {}
