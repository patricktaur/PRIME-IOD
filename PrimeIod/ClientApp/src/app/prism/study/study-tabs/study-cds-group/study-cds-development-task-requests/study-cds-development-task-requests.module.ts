import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';
import { StudyCDSDevelopmentTaskRequestsRoutingModule } from './study-cds-dev-task-req-routing.module';
import { StudyCDSDevelopmentTaskRequestsContainerComponent } from './study-cds-development-task-requests-container/study-cds-dev-task-req-container.component';
import { StudyCDSDevelopmentTaskRequestsListComponent } from './study-cds-development-task-requests-list/study-cds-development-task-requests-list.component';
import { StudyCDSDevelopmentTaskRequestsEditComponent } from './study-cds-dev-task-req-item-group/study-cds-development-task-requests-edit/study-cds-dev-task-req-edit.component';
import { StudyCdsDevelopmentTaskRequestsFiltersComponent } from './study-cds-development-task-requests-filters/study-cds-development-task-requests-filters.component';
@NgModule({
  declarations: [
    StudyCDSDevelopmentTaskRequestsContainerComponent,
    StudyCDSDevelopmentTaskRequestsListComponent,
    StudyCDSDevelopmentTaskRequestsEditComponent,
    StudyCdsDevelopmentTaskRequestsFiltersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    CdsSharedCompsModule,
    StudyCDSDevelopmentTaskRequestsRoutingModule
  ]
})
export class StudyCDSDevelopmentTaskRequestsModule {}
