import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { ImiTrackersGroupContainerComponent } from './imi-trackers-group-container/imi-trackers-group-container.component';
import { PermissionGuard } from '@app/core/authentication/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: ImiTrackersGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'imi-ra-devp-request'
      },
      {
        path: 'imi-ra-devp-request',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-devp-req.module').then(
            m => m.ImiRaDevpReqModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'imi-r&a-tracker-development-request-edit', redirectUrl: 'imi-ra-devp-request-view' }
      },
      {
        path: 'imi-ra-devp-request-view',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-devp-req.module').then(
            m => m.ImiRaDevpReqModule
          ),
        data: {
          mode: 'view'
        }
      },
      {
        path: 'imi-ra-output-request',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-output-req/imi-ra-output-req.module').then(
            m => m.ImiRaOutputReqModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'imi-r&a-tracker-output-request-edit', redirectUrl: 'imi-ra-output-request-view' }
      },
      {
        path: 'imi-ra-output-request-view',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-output-req/imi-ra-output-req.module').then(
            m => m.ImiRaOutputReqModule
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
export class ImiTrackersGroupRoutingModule {}
