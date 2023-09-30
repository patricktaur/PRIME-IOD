import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';
import { CdsCodingTaskReqGroupRoutingModule } from './cds-coding-task-req-group-routing.module';
import { CdsCodingTaskReqGroupContainerComponent } from './cds-coding-task-req-group-container/cds-coding-task-req-group-container.component';
import { CdsCodingTaskReqGroupListComponent } from './cds-coding-task-req-group-list/cds-coding-task-req-group-list.component';
// import { CdsCodingTaskReqGroupEditComponent } from './cds-coding-task-req-group-edit/cds-coding-task-req-group-edit.component';

@NgModule({
  declarations: [
    CdsCodingTaskReqGroupContainerComponent,
    CdsCodingTaskReqGroupListComponent
    // CdsCodingTaskReqGroupEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, CdsCodingTaskReqGroupRoutingModule]
})
export class CdsCodingTaskReqGroupModule {}
