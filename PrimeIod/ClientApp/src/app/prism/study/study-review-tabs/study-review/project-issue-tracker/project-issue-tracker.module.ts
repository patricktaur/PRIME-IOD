import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';

import { ProjectIssueTrackerRoutingModule } from './project-issue-tracker-routing.module';
import { ProjectIssueTrackerContainerComponent } from './project-issue-tracker-container/project-issue-tracker-container.component';
import { ProjectIssueTrackerListComponent } from '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker-list/project-issue-tracker-list.component';
import { ProjectIssueTrackerEditComponent } from '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker-edit/project-issue-tracker-edit.component';

@NgModule({
  declarations: [
    ProjectIssueTrackerContainerComponent,
    ProjectIssueTrackerListComponent,
    ProjectIssueTrackerEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ProjectIssueTrackerRoutingModule]
})
export class ProjectIssueTrackerModule {}
