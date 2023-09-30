import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesContainerComponent } from './roles-container/roles-container.component';
import { RolesListComponent } from './roles-list/roles-list.component';
const routes: Routes = [
  {
    path: '',
    component: RolesContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'roles-list'
      },
      {
        path: 'roles-list',
        component: RolesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
