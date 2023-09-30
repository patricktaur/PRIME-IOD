import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { QualityGroupRoutingModule } from './quality-group-routing.module';
import { QualityGroupContainerComponent } from './quality-group-container/quality-group-container.component';
import { StudyKpiDashboardComponent } from './study-kpi-dashboard/study-kpi-dashboard.component';
import { StudyKpiViewComponent } from './study-kpi-view/study-kpi-view.component';
import { StudyKpiDashboardViewComponent } from './study-kpi-dashboard-view/study-kpi-dashboard-view.component';

@NgModule({
  declarations: [
    QualityGroupContainerComponent, 
    StudyKpiDashboardComponent, 
    StudyKpiViewComponent, 
    StudyKpiDashboardViewComponent, 
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, QualityGroupRoutingModule]
})
export class QualityGroupModule {}
