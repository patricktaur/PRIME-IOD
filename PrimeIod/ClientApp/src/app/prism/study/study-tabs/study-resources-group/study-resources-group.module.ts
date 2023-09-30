import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyResourcesGroupRoutingModule } from './study-resources-group-routing.module';
import { StudyResourcesGroupContainerComponent } from './study-resources-group-container/study-resources-group-container.component';

@NgModule({
  declarations: [StudyResourcesGroupContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyResourcesGroupRoutingModule]
})
export class StudyResourcesGroupModule {}
