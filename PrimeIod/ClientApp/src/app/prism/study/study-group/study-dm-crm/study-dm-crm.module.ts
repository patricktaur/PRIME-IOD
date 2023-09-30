import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyDmCrmRoutingModule } from './study-dm-crm-routing.module';
import { StudyDmCrmContainerComponent } from './study-dm-crm-container/study-dm-crm-container.component';

@NgModule({
  declarations: [StudyDmCrmContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyDmCrmRoutingModule]
})
export class StudyDmCrmModule {}
