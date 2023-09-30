import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

import { StudyCdsCodingTaskItemGroupContainerComponent } from './study-cds-coding-task-item-group-container/study-cds-coding-task-item-group-container.component';
import { StudyCdsCodingTaskViewComponent } from './tudy-cds-coding-task-view/tudy-cds-coding-task-view.component';
import { TudyCdsCodingTaskHistoryComponent } from './tudy-cds-coding-task-history/tudy-cds-coding-task-history.component';
import { StudyCDSCodingTaskEditComponent } from './study-cds-coding-task-edit/study-cds-coding-task-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCdsCodingTaskItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: StudyCdsCodingTaskViewComponent
      },
      {
        path: 'history',
        component: TudyCdsCodingTaskHistoryComponent
      },
      {
        path: 'edit',
        component: StudyCDSCodingTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: '**',
        component: StudyCdsCodingTaskViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdsCodingTaskItemGroupRoutingModule {}
