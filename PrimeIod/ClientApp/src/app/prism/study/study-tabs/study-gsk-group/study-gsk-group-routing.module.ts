import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyGroupContainerComponent } from './study-gsk-group-container/study-gsk-group-container.component';
import { StudyGroupEditComponent } from './study-gsk-group-edit/study-gsk-group-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudyGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'general'
      },

      {
        path: 'general',
        component: StudyGroupEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'queries',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-gsk-group/study-gsk-queries/study-gsk-queries.module').then(
            m => m.StudyGskKpiDashboardQueryModule
          )
      },
      {
        path: 'protocol-amendments',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-gsk-group/study-gsk-amendments/study-gsk-amendments.module').then(
            m => m.StudyGskKpiDashboardProtocolAmendmentsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyGroupRoutingModule {}
