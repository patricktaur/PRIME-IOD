import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyGskKpiDashboardProtocolAmendmentsContainerComponent } from './study-gsk-amendments-container/study-gsk-amendments-container.component';
import { StudyGskKpiDashboardProtocolAmendmentsListComponent } from './study-gsk-amendments-list/study-gsk-amendments-list.component';
import { StudyGskKpiDashboardProtocolAmendmentsEditComponent } from './study-gsk-amendments-edit/study-gsk-amendments-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudyGskKpiDashboardProtocolAmendmentsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyGskKpiDashboardProtocolAmendmentsListComponent
      },
      {
        path: 'edit',
        component: StudyGskKpiDashboardProtocolAmendmentsEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyGskKpiDashboardProtocolAmendmentsRoutingModule {}
