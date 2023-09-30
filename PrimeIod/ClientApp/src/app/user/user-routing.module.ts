import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from '@app/user/user-info/user-info.component';

import { CompPermissionsComponent } from '@app/prism/admin/app-access/comp-permissions/comp-permissions.component';
import {AppAccessContainerComponent} from '@app/prism/admin/app-access/app-access-container/app-access-container.component'
//import {AppAccessUserIdService} from '@app/prism/admin/app-access/app-access-user-id.service'
import {UserAccessViewComponent} from './user-access-view/user-access-view.component'
import { UserLoginDetailsComponent } from './user-login-details/user-login-details.component';
// const routes: Routes = [{ path: 'user-info', component: UserInfoComponent }];
const routes: Routes = [
  {
    path: 'user-access-view',
    component: UserInfoComponent,
    children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: 'user-access-view'
    },
    {
      path: 'user-access-view',
      component: UserAccessViewComponent,
    }]
  },
  {
    path: 'login-details',
    component: UserLoginDetailsComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
