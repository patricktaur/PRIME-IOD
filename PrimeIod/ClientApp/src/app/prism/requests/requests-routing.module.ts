import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { RequestsContainerComponent } from './requests-container/requests-container.component';
const routes: Routes = [
  {
    path: '',
    component: RequestsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'study-request'
      },
      {
        path: 'study-request',
        loadChildren: () =>
          import('@app/prism/requests/study-requests/study-requests.module').then(m => m.StudyRequestsModule),
          canActivate: [PermissionGuard],
          data: {
            parentPath: 'requests'
          }
      },
      {
        path: 'imi-study-request',
        loadChildren: () =>
          import('@app/prism/requests/imi-study-requests/imi-study-requests.module').then(m => m.ImiStudyRequestsModule),
          canActivate: [PermissionGuard],
          data: {
            parentPath: 'requests'
          }
      },
      {
        path: 'crm-study-request',
        loadChildren: () =>
          import('@app/prism/crm/crm-study-requests/crm-study-request.module').then(m => m.CrmStudyRequestModule),
          canActivate: [PermissionGuard],
          data: {
            parentPath: 'requests'
          }      
      },
      {
        path: 'user-request',
        loadChildren: () =>
          import('@app/prism/requests/user-requests/user-requests.module').then(m => m.UserRequestsModule),
          canActivate: [PermissionGuard],
          data: {
            parentPath: 'requests'
          }
      },
      {
        path: 'codelist-request',
        loadChildren: () =>
          import('@app/prism/requests/codelist-requests/codelist-requests.module').then(m => m.CodelistRequestsModule),
          canActivate: [PermissionGuard],
          data: {
            parentPath: 'requests'
          }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}
