import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from './login.component';
import { NotRegisteredComponent } from './not-registered/not-registered.component';
import { LogOutComponent } from '@app/login/log-out/log-out.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'log-out', component: LogOutComponent },

  { path: 'not-registered', component: NotRegisteredComponent, data: { title: extract('not-registered') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {}
