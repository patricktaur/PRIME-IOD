import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CodelistRequestsRoutingModule } from './codelist-requests-routing.module';
import { CodelistRequestsContainerComponent } from './codelist-requests-container/codelist-requests-container.component';
import { CreateRequestListComponent } from './create/create-request-list/create-request-list.component';
import { CreateRequestEditComponent } from './create/create-request-edit/create-request-edit.component';
import { CreateRequestFilterComponent } from './create/create-request-filter/create-request-filter.component';
import { UpdateRequestEditComponent } from './update/update-request-edit/update-request-edit.component';
import { UpdateRequestListComponent } from './update/update-request-list/update-request-list.component';
import { UpdateRequestFilterComponent } from './update/update-request-filter/update-request-filter.component';
import { DeactivateRequestListComponent } from './deactivate/deactivate-request-list/deactivate-request-list.component';
import { DeactivateRequestEditComponent } from './deactivate/deactivate-request-edit/deactivate-request-edit.component';
import { DeactivateRequestFilterComponent } from './deactivate/deactivate-request-filter/deactivate-request-filter.component';
import { ApprovalRequestListComponent } from './approval/approval-request-list/approval-request-list.component';
import { ApprovalRequestEditComponent } from './approval/approval-request-edit/approval-request-edit.component';
import { ApprovalRequestFilterComponent } from './approval/approval-request-filter/approval-request-filter.component';
@NgModule({
  declarations: [
    CodelistRequestsContainerComponent,
    CreateRequestListComponent,
    CreateRequestEditComponent,
    CreateRequestFilterComponent,
    UpdateRequestEditComponent,
    UpdateRequestListComponent,
    UpdateRequestFilterComponent,
    DeactivateRequestListComponent,
    DeactivateRequestEditComponent,
    DeactivateRequestFilterComponent,
    ApprovalRequestListComponent,
    ApprovalRequestEditComponent,
    ApprovalRequestFilterComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CodelistRequestsRoutingModule]
})
export class CodelistRequestsModule {}
