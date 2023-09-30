import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCdmsGroupContainerComponent } from './study-cdms-group-container/study-cdms-group-container.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';
import { StudyCdmsComponent } from './study-cdms/study-cdms.component';
import { StudyCdmsViewComponent } from './study-cdms-view/study-cdms-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyCdmsExtractSpecificationComponent } from './study-cdms-extract-specification/study-cdms-extract-specification.component';
const routes: Routes = [
  {
    path: '',
    component: StudyCdmsGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cdms'
      },
      {
        path: 'cdms',
        component: StudyCdmsComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        // data: {  parentPath: 'study/dm/cdms-group' },
      },
      {
        path: 'cdms-view',
        component: StudyCdmsViewComponent
      },
      {
        path: 'cdms-extract-specification',
        component: StudyCdmsExtractSpecificationComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [PermissionGuard],
        // data: {  parentPath: 'study/dm/cdms-group' },
      },
      {
        path: 'cdms-cppc',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/cdms-cppc/cdms-cppc.module').then(m => m.CdmsCppcModule),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-cdms-cppc-edit', redirectUrl: 'cdms-cppc-view' }
      },
      {
        path: 'cdms-cppc-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/cdms-cppc/cdms-cppc.module').then(m => m.CdmsCppcModule),
        data: { 
          mode: 'view'
        }
      },
      {
        path: 'cdms-tracker',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/study-cdms-tracker.module').then(
            m => m.StudyCdmsTrackerModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-cdms-tracker-edit', redirectUrl: 'cdms-tracker-view' }
      },
      {
        path: 'cdms-tracker-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/study-cdms-tracker.module').then(
            m => m.StudyCdmsTrackerModule
          ),
        data: {
          mode: 'view'
        }
      },
      // {
      //   path: 'third-party-cdms-tracker',
      //   component: NotReadyComponent
      // },
      {
        path: 'third-party-cdms-tracker',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/third-party-tracker/third-party-tracker.module').then(
            m => m.ThirdPartyTrackerModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-cdms-clininfo-tracker-edit', redirectUrl: 'third-party-cdms-tracker-view' }
      },
      {
        path: 'third-party-cdms-tracker-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cdms-group/third-party-tracker/third-party-tracker.module').then(
            m => m.ThirdPartyTrackerModule
          ),
        data: {
          mode: 'view'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdmsGroupRoutingModule {}
