import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminImiRoutingModule } from './admin-imi-routing.module';
import { AdminImiContainerComponent } from './admin-imi-container/admin-imi-container.component';

import { ImiCdmsTasksListComponent } from './imi-cdms-tasks/imi-cdms-tasks-list/imi-cdms-tasks-list.component';
import { ImiCdmsTasksEditComponent } from './imi-cdms-tasks/imi-cdms-tasks-edit/imi-cdms-tasks-edit.component';
import { ImiCdmsTaskGroupsListComponent } from './imi-cdms-task-groups/imi-cdms-task-groups-list/imi-cdms-task-groups-list.component';
import { ImiCdmsTaskGroupsEditComponent } from './imi-cdms-task-groups/imi-cdms-task-groups-edit/imi-cdms-task-groups-edit.component';
import { ImiCdmsAndCdmsTypeListComponent } from './imi-cdms-and-cdms-type/imi-cdms-and-cdms-type-list/imi-cdms-and-cdms-type-list.component';
import { ImiCdmsAndCdmsTypeEditComponent } from './imi-cdms-and-cdms-type/imi-cdms-and-cdms-type-edit/imi-cdms-and-cdms-type-edit.component';



@NgModule({
  declarations: [
    AdminImiContainerComponent,
    ImiCdmsTasksListComponent,
    ImiCdmsTasksEditComponent,
    ImiCdmsAndCdmsTypeEditComponent,
    ImiCdmsAndCdmsTypeListComponent,
    ImiCdmsTaskGroupsListComponent,
    ImiCdmsTaskGroupsEditComponent,
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminImiRoutingModule]
})
export class  AdminImiModule {}
