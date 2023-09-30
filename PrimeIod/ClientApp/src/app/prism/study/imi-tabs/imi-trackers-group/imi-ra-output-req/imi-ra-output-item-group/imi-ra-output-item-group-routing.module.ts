import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { ImiRaOutputReqItemGroupContainerComponent } from './imi-ra-output-item-group-container/imi-ra-output-item-group-container.component';
import { ImiRaOutputReqViewComponent } from './imi-ra-output-req-view/imi-ra-output-req-view.component';
import { ImiRaOutputReqEditComponent } from './imi-ra-output-req-edit/imi-ra-output-req-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: ImiRaOutputReqItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit'
      },
      {
        path: 'view',
        component: ImiRaOutputReqViewComponent
      },
      {
        path: 'edit',
        component: ImiRaOutputReqEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [StudyEditGuard],
        // data: { userRole: UserRoles.IMI_PM, redirectUrl: 'view' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiRaOutputReqItemGroupRoutingModule {}
