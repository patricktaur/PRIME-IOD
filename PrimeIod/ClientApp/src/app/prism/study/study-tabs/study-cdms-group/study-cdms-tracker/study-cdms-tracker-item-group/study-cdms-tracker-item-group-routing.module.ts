import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCdmsTrackerItemGroupContainerComponent } from './study-cdms-tracker-item-group-container/study-cdms-tracker-item-group-container.component';
import { StudyCdmsTrackerViewComponent } from './study-cdms-tracker-view/study-cdms-tracker-view.component';
import { StudyCdmsTrackerEditComponent } from './study-cdms-tracker-edit/study-cdms-tracker-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { PermissionGuard } from '@app/core/authentication/permission.guard';
const routes: Routes = [
  {
    path: '',
    component: StudyCdmsTrackerItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit'
      },
      {
        path: 'edit',
        component: StudyCdmsTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard],

        // canActivate: [ PermissionGuard ],
      },
      {
        path: 'view',
        component: StudyCdmsTrackerViewComponent
      },
      
      {
        path: '**',
        component: StudyCdmsTrackerViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdmsTrackerItemGroupRoutingModule {}
