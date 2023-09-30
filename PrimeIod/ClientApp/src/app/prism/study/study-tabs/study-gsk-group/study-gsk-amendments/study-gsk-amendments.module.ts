import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyGskKpiDashboardProtocolAmendmentsRoutingModule } from './study-gsk-amendments-routing.module';
import { StudyGskKpiDashboardProtocolAmendmentsContainerComponent } from './study-gsk-amendments-container/study-gsk-amendments-container.component';
import { StudyGskKpiDashboardProtocolAmendmentsListComponent } from './study-gsk-amendments-list/study-gsk-amendments-list.component';
import { StudyGskKpiDashboardProtocolAmendmentsEditComponent } from './study-gsk-amendments-edit/study-gsk-amendments-edit.component';

@NgModule({
  declarations: [
    StudyGskKpiDashboardProtocolAmendmentsContainerComponent,
    StudyGskKpiDashboardProtocolAmendmentsListComponent,
    StudyGskKpiDashboardProtocolAmendmentsEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyGskKpiDashboardProtocolAmendmentsRoutingModule]
})
export class StudyGskKpiDashboardProtocolAmendmentsModule {}
