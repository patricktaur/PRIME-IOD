import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogdetailsContainerComponent } from './logdetails-container/logdetails-container.component';
import { ErrorLogListComponent } from './error-log/error-log-list/error-log-list.component';
import { ErrorLogEditComponent } from './error-log/error-log-edit/error-log-edit.component';
import { MailLogListComponent } from './mail-log/mail-log-list/mail-log-list.component';
import { MailLogEditComponent } from './mail-log/mail-log-edit/mail-log-edit.component';
import { LoginDetailsLogListComponent } from './login-details-log/login-details-log-list/login-details-log-list.component';
import { LoginDetailsLogEditComponent } from './login-details-log/login-details-log-edit/login-details-log-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LogdetailsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mail-log'
      },
      {
        path: 'error-log',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: ErrorLogListComponent
          },
          {
            path: 'edit',
            component: ErrorLogEditComponent
          }
        ]  
      }, 
      {
        path: 'mail-log',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: MailLogListComponent
          },
          {
            path: 'edit',
            component: MailLogEditComponent
          }
        ]
      }, 
      {
        path: 'login-details-log',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: LoginDetailsLogListComponent
          },
          {
            path: 'edit',
            component: LoginDetailsLogEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogDetailsRoutingModule {}
