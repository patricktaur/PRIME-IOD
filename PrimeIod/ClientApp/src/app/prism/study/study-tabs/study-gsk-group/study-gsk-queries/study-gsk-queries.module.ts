import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyGskKpiDashboardQueryRoutingModule } from './study-gsk-queries-routing.module';
import { StudyGskKpiDashboardQueryContainerComponent } from './study-gsk-queries-container/study-gsk-queries-container.component';
import { StudyGskKpiDashboardQueryListComponent } from './study-gsk-queries-list/study-gsk-queries-list.component';
import { StudyGskKpiDashboardQueryEditComponent } from './study-gsk-queries-edit/study-gsk-queries-edit.component';

@NgModule({
  declarations: [
    StudyGskKpiDashboardQueryContainerComponent,
    StudyGskKpiDashboardQueryListComponent,
    StudyGskKpiDashboardQueryEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyGskKpiDashboardQueryRoutingModule]
})
export class StudyGskKpiDashboardQueryModule {}
