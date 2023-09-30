import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { StudyCdsOutputTaskItemGroupContainerComponent } from './study-cds-output-task-item-group-container/study-cds-output-task-item-group-container.component';
import { StudyCdsOutputTaskViewComponent } from './study-cds-output-task-view/study-cds-output-task-view.component';
import { StudyCdsOutputTaskHistoryComponent } from './study-cds-output-task-history/study-cds-output-task-history.component';
import { StudyCDSOutputTaskEditComponent } from './study-cds-output-task-edit/study-cds-output-task-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCdsOutputTaskItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: StudyCdsOutputTaskViewComponent
      },
      {
        path: 'history',
        component: StudyCdsOutputTaskHistoryComponent
      },
      {
        path: 'edit',
        component: StudyCDSOutputTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: '**',
        component: StudyCdsOutputTaskViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdsOutputTaskItemGroupRoutingModule {}
