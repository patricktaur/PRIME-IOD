import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImiTrackerItemDashboardComponent } from './imi-tracker-item-dashboard/imi-tracker-item-dashboard.component';

@NgModule({
  declarations: [ImiTrackerItemDashboardComponent],
  imports: [CommonModule],
  exports: [ImiTrackerItemDashboardComponent]
})
export class ImiTrackerGroupSharedModule {}
