import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyImiRoutingModule } from './study-imi-routing.module';
import { StudyImiContainerComponent } from './study-imi-container/study-imi-container.component';

@NgModule({
  declarations: [StudyImiContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyImiRoutingModule]
})
export class StudyImiModule {}
