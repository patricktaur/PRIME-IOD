import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { AppAccessGroupContainerComponent } from './group-access-container/group-access-container.component';
import { AppAccessGroupListComponent } from './group-access-list/group-access-list.component';
import { AppAccessGroupEditComponent } from './group-access-edit/group-access-edit.component';
import { GroupAccessMembersComponent } from './group-access-members/group-access-members.component';
const routes: Routes = [
  {
    path: '',
    component: AppAccessGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: AppAccessGroupListComponent
      },
      {
        path: 'edit',
        component: AppAccessGroupEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'members',
        component: GroupAccessMembersComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAccessGroupRoutingModule {}
