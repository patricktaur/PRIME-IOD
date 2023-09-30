import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdmsSharedModule } from '@app/prism/study/study-tabs/study-cdms-group/cdms-shared/cdms-shared.module';
import { StudyCdmsTrackerRoutingModule } from './study-cdms-tracker-routing.module';
import { StudyCdmsTrackerListComponent } from './study-cdms-tracker-list/study-cdms-tracker-list.component';
import { StudyCdmsTrackerContainerComponent } from './study-cdms-tracker-container/study-cdms-tracker-container.component';

@NgModule({
  declarations: [StudyCdmsTrackerListComponent, StudyCdmsTrackerContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdmsSharedModule, StudyCdmsTrackerRoutingModule]
})
export class StudyCdmsTrackerModule {}
