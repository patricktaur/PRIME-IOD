import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiStudyRequestsRoutingModule } from './imi-study-requests-routing.module';
import { ImiStudyRequestsContainerComponent } from './imi-study-requests-container/imi-study-requests-container.component';
import { ImiStudyRequestRequestListComponent } from './imi-study-request-request/imi-study-request-request-list/imi-study-request-request-list.component';
import { ImiStudyRequestRequestEditComponent } from './imi-study-request-request/imi-study-request-request-edit/imi-study-request-request-edit.component';
import { ImiStudyRequestApprovalEditComponent } from './imi-study-request-approval/imi-study-request-approval-edit/imi-study-request-approval-edit.component';
import { ImiStudyRequestApprovalListComponent } from './imi-study-request-approval/imi-study-request-approval-list/imi-study-request-approval-list.component';
import { ImiStudyApproveFilterComponent } from './filters/imi-study-approve-filter/imi-study-approve-filter.component';
import { ImiStudyRequestFilterComponent } from './filters/imi-study-request-filter/imi-study-request-filter.component';

@NgModule({
  declarations: [
    ImiStudyRequestsContainerComponent,
    ImiStudyRequestRequestListComponent,
    ImiStudyRequestRequestEditComponent,
    ImiStudyRequestApprovalEditComponent,
    ImiStudyRequestApprovalListComponent,
    ImiStudyApproveFilterComponent,
    ImiStudyRequestFilterComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiStudyRequestsRoutingModule]
})
export class ImiStudyRequestsModule {}
