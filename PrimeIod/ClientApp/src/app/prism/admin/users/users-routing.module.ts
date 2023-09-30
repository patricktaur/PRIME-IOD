import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersContainerComponent } from './users-container/users-container.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
const routes: Routes = [
  {
    path: '',
    component: UsersContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: UsersListComponent
      },
      {
        path: 'edit',
        component: UsersEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
