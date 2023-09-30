import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUploadsImiContainerComponent } from './admin-uploads-imi-container/admin-uploads-imi-container.component';
import { ImiTimelinesListComponent } from './imi-timelines/imi-timelines-list/imi-timelines-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUploadsImiContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'imi-timelines-list'
      },
      {
        path: 'imi-timelines-list',
        component: ImiTimelinesListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUploadsImiRoutingModule {}
