import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiStudyCdmsTrackerItemGroupContainerComponent } from './imi-study-cdms-tracker-item-group-container/imi-study-cdms-tracker-item-group-container.component';
import { ImiStudyCdmsTrackerEditComponent } from './imi-study-cdms-tracker-edit/imi-study-cdms-tracker-edit.component';
import { ImiStudyCdmsTrackerViewComponent } from './imi-study-cdms-tracker-view/imi-study-cdms-tracker-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { PermissionGuard } from '@app/core/authentication/permission.guard';
const routes: Routes = [
  {
    path: '',
    component: ImiStudyCdmsTrackerItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit'
      },
      {
        path: 'view',
        component: ImiStudyCdmsTrackerViewComponent
      },

      {
        path: 'edit',
        component: ImiStudyCdmsTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-cdms-tracker-edit', redirectUrl: 'view' }
      },
      {
        path: '**',
        component: ImiStudyCdmsTrackerViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiStudyCdmsTrackerItemGroupRoutingModule {}
