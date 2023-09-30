import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ProcessImprovementTrackerContainerComponent } from './process-improvement-tracker-container/process-improvement-tracker-container.component';
import { ProcessImprovementTrackerListComponent } from '@app/prism/process-improvement-trackers/dm-process-improvement-tracker/process-improvement-tracker-list/process-improvement-tracker-list.component';
import { ProcessImprovementTrackerEditComponent } from './process-improvement-tracker-item-group/process-improvement-tracker-edit/process-improvement-tracker-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ProcessImprovementTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ProcessImprovementTrackerListComponent
      },

      {
        path: 'new',
        component: ProcessImprovementTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },

      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/process-improvement-trackers/dm-process-improvement-tracker/process-improvement-tracker-item-group/process-improvement-tracker-item-group.module'
          ).then(m => m.ProcessImporementTrackerItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessImprovementTrackerRoutingModule {}
