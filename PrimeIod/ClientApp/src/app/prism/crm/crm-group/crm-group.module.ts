import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmGroupRoutingModule } from './crm-group-routing.module';
import { CrmGroupContainerComponent } from './crm-group-container/crm-group-container.component';

@NgModule({
  declarations: [CrmGroupContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmGroupRoutingModule]
})
export class CrmGroupModule {}
