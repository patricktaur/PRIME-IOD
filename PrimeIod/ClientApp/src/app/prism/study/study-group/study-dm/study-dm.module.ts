import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyDmRoutingModule } from './study-dm-routing.module';
import { StudyDmContainerComponent } from './study-dm-container/study-dm-container.component';

@NgModule({
  declarations: [StudyDmContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyDmRoutingModule]
})
export class StudyDmModule {}
