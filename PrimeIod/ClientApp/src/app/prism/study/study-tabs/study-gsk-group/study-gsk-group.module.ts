import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyGroupRoutingModule } from './study-gsk-group-routing.module';
import { StudyGroupContainerComponent } from './study-gsk-group-container/study-gsk-group-container.component';
import { StudyGroupEditComponent } from './study-gsk-group-edit/study-gsk-group-edit.component';

@NgModule({
  declarations: [StudyGroupContainerComponent, StudyGroupEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyGroupRoutingModule]
})
export class StudyGskGroupModule {}
