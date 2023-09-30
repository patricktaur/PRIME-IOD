import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiRaDevpReqItemGroupContainerComponent } from './imi-ra-devp-req-item-group-container/imi-ra-devp-req-item-group-container.component';
import { ImiRaDevpReqViewComponent } from './imi-ra-devp-req-view/imi-ra-devp-req-view.component';
import { ImiRaDevpReqEditComponent } from './imi-ra-devp-req-edit/imi-ra-devp-req-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { PermissionGuard } from '@app/core/authentication/permission.guard';
const routes: Routes = [
  {
    path: '',
    component: ImiRaDevpReqItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit'
      },
      {
        path: 'view',
        component: ImiRaDevpReqViewComponent
      },

      {
        path: 'edit',
        component: ImiRaDevpReqEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [PermissionGuard],
        // data: { userRole: UserRoles.IMI_PM, redirectUrl: 'view' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiRaDevpReqItemGroupRoutingModule {}
