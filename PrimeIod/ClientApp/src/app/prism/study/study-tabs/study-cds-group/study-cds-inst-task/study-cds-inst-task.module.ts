import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';

import { StudyCDSInstTaskRoutingModule } from './study-cds-inst-task-routing.module';
import { StudyCDSInstTaskContainerComponent } from './study-cds-inst-task-container/study-cds-inst-task-container.component';
import { StudyCDSInstTaskListComponent } from './study-cds-inst-task-list/study-cds-inst-task-list.component';
import { StudyCDSInstTaskEditComponent } from './study-cds-inst-task-item-group/study-cds-inst-task-edit/study-cds-inst-task-edit.component';
import { StudyCdsInstTaskFiltersComponent } from './study-cds-inst-task-filters/study-cds-inst-task-filters.component';

@NgModule({
  declarations: [
    StudyCDSInstTaskContainerComponent,
    StudyCDSInstTaskListComponent,
    StudyCDSInstTaskEditComponent,
    StudyCdsInstTaskFiltersComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, StudyCDSInstTaskRoutingModule]
})
export class StudyCDSInstTaskModule {}
