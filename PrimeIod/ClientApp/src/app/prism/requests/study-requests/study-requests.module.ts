import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyRequestsRoutingModule } from './study-requests-routing.module';
import { StudyRequestsContainerComponent } from './study-requests-container/study-requests-container.component';
import { StudyRequestsListComponent } from './study-requests-list/study-requests-list.component';
import { StudyRequestsEditComponent } from './study-requests-edit/study-requests-edit.component';
import { StudyRequestFilterComponent } from './filters/study-request-filter/study-request-filter.component';
import { StudyRequestApprovalListComponent } from './approval/study-request-approval-list/study-request-approval-list.component';
import { StudyRequestApprovalEditComponent } from './approval/study-request-approval-edit/study-request-approval-edit.component';
import { StudyRequestApproveFilterComponent } from './filters/study-request-approve-filter/study-request-approve-filter.component';
@NgModule({
  declarations: [
    StudyRequestsContainerComponent,
    StudyRequestsListComponent,
    StudyRequestsEditComponent,
    StudyRequestFilterComponent,
    StudyRequestApprovalListComponent,
    StudyRequestApprovalEditComponent,
    StudyRequestApproveFilterComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyRequestsRoutingModule]
})
export class StudyRequestsModule {}
