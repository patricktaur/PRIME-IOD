import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyDeliverablesRoutingModule } from './study-deliverables-routing.module';
import { StudyDeliverablesContainerComponent } from './study-deliverables-container/study-deliverables-container.component';
import { StudyDeliverablesListComponent } from './study-deliverables-list/study-deliverables-list.component';
import { StudyDeliverablesEditComponent } from './study-deliverables-edit/study-deliverables-edit.component';

@NgModule({
  declarations: [StudyDeliverablesContainerComponent, StudyDeliverablesListComponent, StudyDeliverablesEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyDeliverablesRoutingModule]
})
export class StudyDeliverablesModule {}
