import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAdminGroupContainerComponent } from './app-admin-group-container/app-admin-group-container.component';
const routes: Routes = [
  {
    path: '',
    component: AppAdminGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'xxx'
      }
      /*
      {
        path: 'xxx',
        component: XXXXComponent
      }
      */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminGroupRoutingModule {}
