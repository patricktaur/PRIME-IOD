import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAccessContainerComponent } from './app-access-container/app-access-container.component';
import { AppAccessViewComponent } from './app-access-view/app-access-view.component';
import {CompPermissionsComponent} from './comp-permissions/comp-permissions.component'
const routes: Routes = [
  {
    path: '',
    component: AppAccessContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app-access-view'
      },
      {
        path: 'component-permission',
        component: CompPermissionsComponent,
      },

      {
        path: 'app-access-view',
        component: AppAccessViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAccessRoutingModule {}
