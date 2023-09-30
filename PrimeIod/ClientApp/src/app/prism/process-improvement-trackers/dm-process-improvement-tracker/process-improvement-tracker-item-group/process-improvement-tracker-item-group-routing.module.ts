import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ProcessImporementTrackerItemGroupContainerComponent } from './process-improvement-tracker-item-group-container/proc-imp-tracker-item-grp-container.component';
import { ProcessImprovementTrackerViewComponent } from './process-improvement-tracker-view/process-improvement-tracker-view.component';
import { ProcessImprovementTrackerHistoryComponent } from './process-improvement-tracker-history/process-improvement-tracker-history.component';
import { ProcessImprovementTrackerEditComponent } from './process-improvement-tracker-edit/process-improvement-tracker-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ProcessImporementTrackerItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: ProcessImprovementTrackerViewComponent
      },
      {
        path: 'history',
        component: ProcessImprovementTrackerHistoryComponent
      },
      {
        path: 'edit',
        component: ProcessImprovementTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '**',
        component: ProcessImprovementTrackerViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessImporementTrackerItemGroupRoutingModule {}
