import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { StudyCDSCodingTaskRoutingModule } from './study-cds-coding-task-routing.module';
import { StudyCDSCodingTaskContainerComponent } from './study-cds-coding-task-container/study-cds-coding-task-container.component';
import { StudyCDSCodingTaskListComponent } from './study-cds-coding-task-list/study-cds-coding-task-list.component';
import { StudyCDSCodingTaskEditComponent } from './study-cds-coding-task-item-group/study-cds-coding-task-edit/study-cds-coding-task-edit.component';
import { StudyCdsCodingTaskFiltersComponent } from './study-cds-coding-task-filters/study-cds-coding-task-filters.component';

@NgModule({
  declarations: [
    StudyCDSCodingTaskContainerComponent,
    StudyCDSCodingTaskListComponent,
    StudyCDSCodingTaskEditComponent,
    StudyCdsCodingTaskFiltersComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, StudyCDSCodingTaskRoutingModule]
})
export class StudyCDSCodingTaskModule {}
