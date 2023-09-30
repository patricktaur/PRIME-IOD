import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyGskKpiDashboardQueryContainerComponent } from './study-gsk-queries-container/study-gsk-queries-container.component';
import { StudyGskKpiDashboardQueryListComponent } from './study-gsk-queries-list/study-gsk-queries-list.component';
import { StudyGskKpiDashboardQueryEditComponent } from './study-gsk-queries-edit/study-gsk-queries-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudyGskKpiDashboardQueryContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyGskKpiDashboardQueryListComponent
      },
      {
        path: 'edit',
        component: StudyGskKpiDashboardQueryEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyGskKpiDashboardQueryRoutingModule {}
