import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdsSharedCompsModule } from '@app/prism/cds-trackers/cds-shared-comps/cds-shared-comps.module';
import { StudyCDSOutputTaskRoutingModule } from './study-cds-output-task-routing.module';
import { StudyCDSOutputTaskContainerComponent } from './study-cds-output-task-container/study-cds-output-task-container.component';
import { StudyCDSOutputTaskListComponent } from './study-cds-output-task-list/study-cds-output-task-list.component';
import { StudyCDSOutputTaskEditComponent } from './study-cds-output-task-item-group/study-cds-output-task-edit/study-cds-output-task-edit.component';
import { StudyCdsOuputTaskFiltersComponent } from './study-cds-ouput-task-filters/study-cds-ouput-task-filters.component';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@NgModule({
  declarations: [
    StudyCDSOutputTaskContainerComponent,
    StudyCDSOutputTaskListComponent,
    StudyCDSOutputTaskEditComponent,
    StudyCdsOuputTaskFiltersComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdsSharedCompsModule, StudyCDSOutputTaskRoutingModule]
  // providers:[
  //   {provide:'cds-output', useClass: ServerResponseService}
  // ]
})
export class StudyCDSOutputTaskModule {}
