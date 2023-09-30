import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyCdsDevTaskReqItemGroupContainerComponent } from './study-cds-dev-task-req-item-group-container/study-cds-dev-itm-grp-cont.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSDevelopmentTaskRequestsEditComponent } from './study-cds-development-task-requests-edit/study-cds-dev-task-req-edit.component';
import { StudyCdsDevTaskReqHistoryComponent } from './study-cds-dev-task-req-history/study-cds-dev-task-req-history.component';
import { StudyCdsDevTaskReqViewComponent } from './study-cds-dev-task-req-view/study-cds-dev-task-req-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

const routes: Routes = [
  {
    path: '',
    component: StudyCdsDevTaskReqItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: StudyCdsDevTaskReqViewComponent
      },
      {
        path: 'history',
        component: StudyCdsDevTaskReqHistoryComponent
      },
      {
        path: 'edit',
        component: StudyCDSDevelopmentTaskRequestsEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [StudyEditGuard],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: '**',
        component: StudyCdsDevTaskReqViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdsDevTaskReqItemGroupRoutingModule {}
