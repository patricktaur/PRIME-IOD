import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminClinInfoRoutingModule } from './admin-clin-info-routing.module';
import { AdminClinInfoContainerComponent } from './admin-clin-info-container/admin-clin-info-container.component';


import { ClininfoCdmsTasksFilterComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-filter/clininfo-cdms-tasks-filter.component';
import { ClininfoCdmsTasksListComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-list/clininfo-cdms-tasks-list.component';
import { ClininfoCdmsTasksEditComponent } from './clininfo-cdms-tasks/clininfo-cdms-tasks-edit/clininfo-cdms-tasks-edit.component';
import { ClininfoCdmsTaskGroupsListComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-list/clininfo-cdms-task-groups-list.component';
import { ClininfoCdmsTaskGroupsEditComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-edit/clininfo-cdms-task-groups-edit.component';
import { ClininfoCdmsTaskGroupsFilterComponent } from './clininfo-cdms-task-groups/clininfo-cdms-task-groups-filter/clininfo-cdms-task-groups-filter.component';
import { ClininfoCdmsAndCdmsTypeListComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-list/clininfo-cdms-and-cdms-type-list.component';
import { ClininfoCdmsAndCdmsTypeEditComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-edit/clininfo-cdms-and-cdms-type-edit.component';
import { ClininfoCdmsAndCdmsTypeFilterComponent } from './clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-filter/clininfo-cdms-and-cdms-type-filter.component';

@NgModule({
  declarations: [
    AdminClinInfoContainerComponent,
    ClininfoCdmsTasksFilterComponent,
    ClininfoCdmsTasksListComponent,
    ClininfoCdmsTasksEditComponent,
    ClininfoCdmsTaskGroupsListComponent,
    ClininfoCdmsTaskGroupsEditComponent,
    ClininfoCdmsTaskGroupsFilterComponent,
    ClininfoCdmsAndCdmsTypeListComponent,
    ClininfoCdmsAndCdmsTypeEditComponent,
    ClininfoCdmsAndCdmsTypeFilterComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminClinInfoRoutingModule]
})
export class  AdminClinInfoModule {}
