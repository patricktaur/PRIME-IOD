import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyCrmRoutingModule } from './study-crm-routing.module';
import { StudyCrmContainerComponent } from './study-crm-container/study-crm-container.component';

@NgModule({
  declarations: [StudyCrmContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyCrmRoutingModule]
})
export class StudyCrmModule {}
