import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessImprovmentTrackersContainerComponent } from './process-improvement-trackers-container/process-improvement-trackers-container.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessImprovmentTrackersContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dm-process-improvement-tracker'
      },

      {
        path: 'dm-process-improvement-tracker',
        loadChildren: () =>
          import(
            '@app/prism/process-improvement-trackers/dm-process-improvement-tracker/process-improvement-tracker.module'
          ).then(m => m.ProcessImprovementTrackerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessImprovmentTrackersRoutingModule {}
