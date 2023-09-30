import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCdmsTrackerContainerComponent } from './study-cdms-tracker-container/study-cdms-tracker-container.component';
import { StudyCdmsTrackerListComponent } from './study-cdms-tracker-list/study-cdms-tracker-list.component';
import { StudyCdmsTrackerEditComponent } from './study-cdms-tracker-item-group/study-cdms-tracker-edit/study-cdms-tracker-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCdmsTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCdmsTrackerListComponent
      },
      {
        path: 'new',
        component: StudyCdmsTrackerEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'list-view' }
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/study-cdms-tracker-item-group/study-cdms-tracker-item-group.module'
          ).then(m => m.StudyCdmsTrackerItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdmsTrackerRoutingModule {}
