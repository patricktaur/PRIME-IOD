import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyStatusPageFlowRoutingModule } from './study-status-pageflow-routing.module';
import { StudyStatusPageFlowContainerComponent } from './study-status-pageflow-container/study-status-pageflow-container.component';
import { StudyStatusComponent } from '@app/prism/study/study-review-tabs/study-status-pageflow/study-status/study-status.component';
import { StudyPageFlowComponent } from '@app/prism/study/study-review-tabs/study-status-pageflow/study-page-flow/study-page-flow.component';
import { StudyStatusAltComponent } from '@app/prism/study/study-review-tabs/study-status-pageflow/study-status-alt/study-status-alt.component';
import { StudyStatusViewComponent } from './study-status-view/study-status-view.component';
import { StudyPageFlowViewComponent } from './study-page-flow-view/study-page-flow-view.component';
import { StudyStatusAltViewComponent } from './study-status-alt-view/study-status-alt-view.component';
@NgModule({
  declarations: [
    StudyStatusPageFlowContainerComponent,
    StudyStatusComponent,
    StudyPageFlowComponent,
    StudyStatusAltComponent,
    StudyStatusViewComponent,
    StudyPageFlowViewComponent,
    StudyStatusAltViewComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyStatusPageFlowRoutingModule]
})
export class StudyStatusPageFlowModule {}
