import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { StudyCdsInstTaskItemGroupContainerComponent } from './study-cds-inst-task-item-group-container/study-cds-inst-task-item-group-container.component';
import { StudyCdsInstTaskViewComponent } from './study-cds-inst-task-view/study-cds-inst-task-view.component';
import { StudyCdsInstTaskHistoryComponent } from './study-cds-inst-task-history/study-cds-inst-task-history.component';
import { StudyCDSInstTaskEditComponent } from './study-cds-inst-task-edit/study-cds-inst-task-edit.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
const routes: Routes = [
  {
    path: '',
    component: StudyCdsInstTaskItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: StudyCdsInstTaskViewComponent
      },
      {
        path: 'history',
        component: StudyCdsInstTaskHistoryComponent
      },
      {
        path: 'edit',
        component: StudyCDSInstTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: '**',
        component: StudyCdsInstTaskViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdsInstTaskItemGroupRoutingModule {}
