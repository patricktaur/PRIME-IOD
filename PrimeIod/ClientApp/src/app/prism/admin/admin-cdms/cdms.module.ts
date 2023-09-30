import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CDMSRoutingModule } from './cdms-routing.module';
import { CdmsContainerComponent } from './cdms-container/cdms-container.component';
import { CdmsTasksListComponent } from './cdms-tasks/cdms-tasks-list/cdms-tasks-list.component';
import { CdmsTasksEditComponent } from './cdms-tasks/cdms-tasks-edit/cdms-tasks-edit.component';
import { CdmsTaskGroupsListComponent } from './cdms-task-groups/cdms-task-groups-list/cdms-task-groups-list.component';
import { CdmsTaskGroupsEditComponent } from './cdms-task-groups/cdms-task-groups-edit/cdms-task-groups-edit.component';
import { CdmsAndCdmsTypeListComponent } from './cdms-and-cdms-type/cdms-and-cdms-type-list/cdms-and-cdms-type-list.component';
import { CdmsAndCdmsTypeEditComponent } from './cdms-and-cdms-type/cdms-and-cdms-type-edit/cdms-and-cdms-type-edit.component';

import { VeevaVaultVersionListComponent } from './veeva-vault-version/veeva-vault-version-list/veeva-vault-version-list.component';
import { RaveUrlVersionListComponent } from './rave-url-version/rave-url-version-list/rave-url-version-list.component';
import { VeevaVaultVersionEditComponent } from './veeva-vault-version/veeva-vault-version-edit/veeva-vault-version-edit.component';
import { VeevaVaultVersionFilterComponent } from './veeva-vault-version/veeva-vault-version-filter/veeva-vault-version-filter.component';
import { RaveUrlVersionFilterComponent } from './rave-url-version/rave-url-version-filter/rave-url-version-filter.component';
import { RaveUrlVersionEditComponent } from './rave-url-version/rave-url-version-edit/rave-url-version-edit.component';


@NgModule({
  declarations: [
    CdmsContainerComponent,
    CdmsTasksListComponent,
    CdmsTasksEditComponent,
    
    CdmsTaskGroupsListComponent,
    CdmsTaskGroupsEditComponent,
    
    CdmsAndCdmsTypeListComponent,
    CdmsAndCdmsTypeEditComponent,
    
    VeevaVaultVersionListComponent,
    RaveUrlVersionListComponent,
    VeevaVaultVersionEditComponent,
    VeevaVaultVersionFilterComponent,
    RaveUrlVersionFilterComponent,
    RaveUrlVersionEditComponent,
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, CDMSRoutingModule]
})
export class CDMSModule {}
