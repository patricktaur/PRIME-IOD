import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ThirdPartyTrackerItemGroupContainerComponent } from './third-party-tracker-item-group-container/third-party-tracker-item-group-container.component';
import { ThirdPartyTrackerViewComponent } from './third-party-tracker-view/third-party-tracker-view.component';
import { ThirdPartyTrackerEditComponent } from './third-party-tracker-edit/third-party-tracker-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: ThirdPartyTrackerItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit'
      },
      {
        path: 'view',
        component: ThirdPartyTrackerViewComponent
      },

      {
        path: 'edit',
        component: ThirdPartyTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: '**',
        component: ThirdPartyTrackerViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyTrackerItemGroupRoutingModule {}
