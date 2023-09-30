import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCrmContainerComponent } from './admin-crm-container/admin-crm-container.component';

import { CrmProjectGovernanceCodelistListComponent } from "./crm-project-governance-codelist/crm-project-governance-codelist-list/crm-project-governance-codelist-list.component";
import { CrmProjectGovernanceCodelistEditComponent } from "./crm-project-governance-codelist/crm-project-governance-codelist-edit/crm-project-governance-codelist-edit.component";
import { CrmCodelistListComponent } from './crm-codelist/crm-codelist-list/crm-codelist-list.component';
import { CrmCodelistEditComponent } from './crm-codelist/crm-codelist-edit/crm-codelist-edit.component';
import { PermissionGuard } from '@app/core/authentication/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminCrmContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'crm-codelist'
      },
      {
        path: 'crm-codelist',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: CrmCodelistListComponent
          },
          {
            path: 'edit',
            component: CrmCodelistEditComponent
          }
        ],
        canActivate: [PermissionGuard]
      },
      {
        path: 'crm-project-governance-codelist',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: CrmProjectGovernanceCodelistListComponent
          },
          {
            path: 'edit',
            component: CrmProjectGovernanceCodelistEditComponent
          }
        ],
        canActivate: [PermissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCrmRoutingModule {}
