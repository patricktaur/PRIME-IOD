import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyDmImiRoutingModule } from './study-dm-imi-routing.module';
import { StudyDmImiContainerComponent } from './study-dm-imi-container/study-dm-imi-container.component';

@NgModule({
  declarations: [StudyDmImiContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyDmImiRoutingModule]
})
export class StudyDmImiModule {}
