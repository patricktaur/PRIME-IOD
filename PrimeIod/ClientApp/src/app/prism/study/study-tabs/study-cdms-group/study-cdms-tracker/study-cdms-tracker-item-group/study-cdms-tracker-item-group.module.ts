import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';

import { StudyCdmsTrackerItemGroupRoutingModule } from './study-cdms-tracker-item-group-routing.module';
import { StudyCdmsTrackerEditComponent } from './study-cdms-tracker-edit/study-cdms-tracker-edit.component';
import { StudyCdmsTrackerViewComponent } from './study-cdms-tracker-view/study-cdms-tracker-view.component';
import { StudyCdmsTrackerItemGroupContainerComponent } from './study-cdms-tracker-item-group-container/study-cdms-tracker-item-group-container.component';

@NgModule({
  declarations: [
    StudyCdmsTrackerEditComponent,
    StudyCdmsTrackerViewComponent,
    StudyCdmsTrackerItemGroupContainerComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyCdmsTrackerItemGroupRoutingModule]
})
export class StudyCdmsTrackerItemGroupModule {}
