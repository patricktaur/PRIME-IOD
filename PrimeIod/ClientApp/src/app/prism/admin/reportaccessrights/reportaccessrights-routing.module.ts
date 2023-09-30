import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportaccessrightsContainerComponent } from './reportaccessrights-container/reportaccessrights-container.component';
const routes: Routes = [
  {
    path: '',
    component: ReportaccessrightsContainerComponent
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'users-list'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportAccessRightsRoutingModule {}
