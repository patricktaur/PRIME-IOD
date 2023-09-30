import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';
import { StudyCDSValTaskRoutingModule } from './study-cds-val-task-routing.module';
import { StudyCDSValTaskContainerComponent } from './study-cds-val-task-container/study-cds-val-task-container.component';
import { StudyCDSValTaskListComponent } from './study-cds-val-task-list/study-cds-val-task-list.component';
import { StudyCDSValTaskEditComponent } from './study-cds-val-task-item-group/study-cds-val-task-edit/study-cds-val-task-edit.component';
import { StudyCdsValTaskFiltersComponent } from './study-cds-val-task-filters/study-cds-val-task-filters.component';

@NgModule({
  declarations: [
    StudyCDSValTaskContainerComponent,
    StudyCDSValTaskListComponent,
    StudyCDSValTaskEditComponent,
    StudyCdsValTaskFiltersComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, StudyCDSValTaskRoutingModule]
})
export class StudyCDSValTaskModule {}
