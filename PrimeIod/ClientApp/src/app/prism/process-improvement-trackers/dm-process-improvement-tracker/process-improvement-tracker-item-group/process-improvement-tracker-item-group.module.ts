import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ProcessImporementTrackerItemGroupRoutingModule } from './process-improvement-tracker-item-group-routing.module';
import { ProcessImporementTrackerItemGroupContainerComponent } from './process-improvement-tracker-item-group-container/proc-imp-tracker-item-grp-container.component';
import { ProcessImprovementTrackerViewComponent } from './process-improvement-tracker-view/process-improvement-tracker-view.component';
import { ProcessImprovementTrackerHistoryComponent } from './process-improvement-tracker-history/process-improvement-tracker-history.component';

@NgModule({
  declarations: [
    ProcessImporementTrackerItemGroupContainerComponent,
    ProcessImprovementTrackerViewComponent,
    ProcessImprovementTrackerHistoryComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ProcessImporementTrackerItemGroupRoutingModule]
})
export class ProcessImporementTrackerItemGroupModule {}
