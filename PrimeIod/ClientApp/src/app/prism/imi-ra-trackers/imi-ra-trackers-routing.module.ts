import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImiRaTrackersGroupContainerComponent } from './imi-ra-trackers-container/imi-ra-trackers-container.component';
const routes: Routes = [
  {
    path: '',
    component: ImiRaTrackersGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'imi-ra-dev-req-group'
      },
      {
        path: 'imi-ra-dev-req-group',
        loadChildren: () =>
          import('@app/prism/imi-ra-trackers/imi-ra-dev-req-group/imi-ra-dev-req-group.module').then(
            m => m.ImiRaDevReqGroupModule
          )
      },
      {
        path: 'imi-ra-output-req-group',
        loadChildren: () =>
          import('@app/prism/imi-ra-trackers/imi-ra-output-req-group/imi-ra-output-req-group.module').then(
            m => m.ImiRaOutputReqGroupModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiRaTrackersGroupRoutingModule {}
