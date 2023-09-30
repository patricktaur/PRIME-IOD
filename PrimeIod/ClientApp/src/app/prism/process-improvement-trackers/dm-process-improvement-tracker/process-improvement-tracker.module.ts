import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ProcessImprovementTrackerRoutingModule } from './process-improvement-tracker-routing.module';
import { ProcessImprovementTrackerContainerComponent } from './process-improvement-tracker-container/process-improvement-tracker-container.component';
import { ProcessImprovementTrackerListComponent } from '@app/prism/process-improvement-trackers/dm-process-improvement-tracker/process-improvement-tracker-list/process-improvement-tracker-list.component';

import { ProcessImprovementTrackerEditComponent } from './process-improvement-tracker-item-group/process-improvement-tracker-edit/process-improvement-tracker-edit.component';
import { DmProcImpTrackerFiltersComponent } from './dm-proc-imp-tracker-filters/dm-proc-imp-tracker-filters.component';
import { DmProcImpTrackerDashboardComponent } from './dm-proc-imp-tracker-dashboard/dm-proc-imp-tracker-dashboard.component';
import { DmProcImpTrackerReportComponent } from './dm-proc-imp-tracker-report/dm-proc-imp-tracker-report.component';

@NgModule({
  declarations: [
    ProcessImprovementTrackerContainerComponent,
    ProcessImprovementTrackerListComponent,
    ProcessImprovementTrackerEditComponent,
    DmProcImpTrackerFiltersComponent,
    DmProcImpTrackerDashboardComponent,
    DmProcImpTrackerReportComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ProcessImprovementTrackerRoutingModule]
})
export class ProcessImprovementTrackerModule {}
