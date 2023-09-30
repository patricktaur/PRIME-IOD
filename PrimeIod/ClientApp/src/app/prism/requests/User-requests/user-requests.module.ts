import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { UserRequestsRoutingModule } from './user-requests-routing.module';
import { UserRequestsContainerComponent } from './user-requests-container/user-requests-container.component';
import { CreateRequestsListComponent } from './create/create-requests-list/create-requests-list.component';
import { CreateRequestsEditComponent } from './create/create-requests-edit/create-requests-edit.component';
import { CreateRequestFilterComponent } from './create/create-request-filter/create-request-filter.component';
import { UpdateRequestFilterComponent } from './update/update-request-filter/update-request-filter.component';
import { UpdateRequestEditComponent } from './update/update-request-edit/update-request-edit.component';
import { UpdateRequestListComponent } from './update/update-request-list/update-request-list.component';
import { DeactivateRequestFilterComponent } from './deactivate/deactivate-request-filter/deactivate-request-filter.component';
import { DeactivateRequestListComponent } from './deactivate/deactivate-request-list/deactivate-request-list.component';
import { DeactivateRequestEditComponent } from './deactivate/deactivate-request-edit/deactivate-request-edit.component';
import { ApprovalRequestFilterComponent } from './approval/approval-request-filter/approval-request-filter.component';
import { ApprovalRequestListComponent } from './approval/approval-request-list/approval-request-list.component';
import { ApprovalRequestEditComponent } from './approval/approval-request-edit/approval-request-edit.component';
import { ApprovalRequestUpdateComponent } from './approval/approval-request-update/approval-update-request.component';
import { ApprovalRequestDeactivateComponent } from './approval/approval-request-deactivate/approval-request-deactivate.component';
@NgModule({
  declarations: [
    UserRequestsContainerComponent,
    CreateRequestsListComponent,
    CreateRequestsEditComponent,
    CreateRequestFilterComponent,
    UpdateRequestFilterComponent,
    UpdateRequestEditComponent,
    UpdateRequestListComponent,
    DeactivateRequestFilterComponent,
    DeactivateRequestListComponent,
    DeactivateRequestEditComponent,
    ApprovalRequestFilterComponent,
    ApprovalRequestListComponent,
    ApprovalRequestEditComponent,
    ApprovalRequestUpdateComponent,
    ApprovalRequestDeactivateComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, UserRequestsRoutingModule]
})
export class UserRequestsModule {}
