import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { PermissionGuard } from '@app/core/authentication/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'roles',
        loadChildren: () => import('@app/prism/admin/roles/roles.module').then(m => m.RoleModule)
      },
      {
        path: 'users',
        loadChildren: () => import('@app/prism/admin/users/users.module').then(m => m.UsersModule),
        canActivate: [PermissionGuard]
      },
      
      {
        path: 'codelist',
        loadChildren: () => import('@app/prism/admin/codelist/codelist.module').then(m => m.CodelistModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'cdms',
        loadChildren: () => import('@app/prism/admin/admin-cdms/cdms.module').then(m => m.CDMSModule),
        // canActivate: [PermissionGuard],
        // data: {
        //   debugMode: true
        // }
      },
      {
        path: 'clin-info',
        loadChildren: () => import('@app/prism/admin/admin-clin-info/admin-clin-info.module').then(m => m.AdminClinInfoModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'cds',
        loadChildren: () => import('@app/prism/admin/admin-cds/admin-cds.module').then(m => m.AdminCdsModule),
        canActivate: [PermissionGuard]
      },
      {
        path: 'imi',
        loadChildren: () => import('@app/prism/admin/admin-imi/admin-imi.module').then(m => m.AdminImiModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'crm',
        loadChildren: () => import('@app/prism/admin/admin-crm/admin-crm.module').then(m => m.AdminCrmModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'process-improvement-categories',
        loadChildren: () => import('@app/prism/admin/admin-proc-imp-tracker/admin-proc-imp-tracker.module').then(m => m.AdminProcImpTrackerModule),
        canActivate: [PermissionGuard]
      },
      {
        path: 'uploads-dm',
        loadChildren: () => import('@app/prism/admin/admin-uploads-dm/admin-uploads-dm.module').then(m => m.AdminUploadsDmModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'uploads-imi',
        loadChildren: () => import('@app/prism/admin/admin-uploads-imi/admin-uploads-imi.module').then(m => m.AdminUploadsImiModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'crm-project-governance-codelist',
        loadChildren: () =>
          import('@app/prism/admin/crm-project-governance-codelist/crm-project-governance-codelist.module').then(m => m.CrmProjectGovernanceCodelistModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'logdetails',
        loadChildren: () => import('@app/prism/admin/logdetails/logdetails.module').then(m => m.LogDetailsModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'reportaccessrights',
        loadChildren: () =>
          import('@app/prism/admin/reportaccessrights/reportaccessrights.module').then(m => m.ReportAccessRightsModule),
          canActivate: [PermissionGuard]
      },
      {
        path: 'upload',
        loadChildren: () => import('@app/prism/admin/upload/upload.module').then(m => m.UploadModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'generateftes',
        loadChildren: () => import('@app/prism/admin/generateftes/generateftes.module').then(m => m.GenerateFTEsModule),
        // canActivate: [PermissionGuard]
      },
      
      {
        path: 'subcodelist',
        loadChildren: () => import('@app/prism/admin/subcodelist/subcodelist.module').then(m => m.SubCodelistModule),
        // canActivate: [PermissionGuard]
      },
      {
        path: 'group-access',
        loadChildren: () =>
          import('@app/prism/admin/group-access/group-access.module').then(m => m.AppAccessGroupModule),
          // canActivate: [PermissionGuard]
      },
      {
        path: 'app-access',
        loadChildren: () => import('@app/prism/admin/app-access/app-access.module').then(m => m.AppAccessModule),
        // canActivate: [PermissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
