import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiStudyIssueTrackerRoutingModule } from './imi-study-issue-tracker-routing.module';
import { ImiStudyIssueTrackerContainerComponent } from './imi-study-issue-tracker-container/imi-study-issue-tracker-container.component';
import { ImiStudyIssueTrackerListComponent } from './imi-study-issue-tracker-list/imi-study-issue-tracker-list.component';
import { ImiStudyIssueTrackerEditComponent } from './imi-study-issue-tracker-edit/imi-study-issue-tracker-edit.component';

@NgModule({
  declarations: [
    ImiStudyIssueTrackerContainerComponent,
    ImiStudyIssueTrackerListComponent,
    ImiStudyIssueTrackerEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiStudyIssueTrackerRoutingModule]
})
export class ImiStudyIssueTrackerModule {}
