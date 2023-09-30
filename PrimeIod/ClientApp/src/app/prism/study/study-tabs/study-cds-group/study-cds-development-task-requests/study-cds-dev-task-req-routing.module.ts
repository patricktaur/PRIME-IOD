import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSDevelopmentTaskRequestsContainerComponent } from './study-cds-development-task-requests-container/study-cds-dev-task-req-container.component';
import { StudyCDSDevelopmentTaskRequestsListComponent } from './study-cds-development-task-requests-list/study-cds-development-task-requests-list.component';
import { StudyCDSDevelopmentTaskRequestsEditComponent } from './study-cds-dev-task-req-item-group/study-cds-development-task-requests-edit/study-cds-dev-task-req-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCDSDevelopmentTaskRequestsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCDSDevelopmentTaskRequestsListComponent,
        // canActivate: [ StudyEditGuardService ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'list-view' }
      },
      // {
      //   path: 'list-view',
      //   component: StudyCDSDevelopmentTaskRequestsListComponent
      // },
      {
        path: 'new',
        component: StudyCDSDevelopmentTaskRequestsEditComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'cds-view' }
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-req-item-group/study-cds-dev-task-req-item-group.module'
          ).then(m => m.StudyCdsDevTaskReqItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCDSDevelopmentTaskRequestsRoutingModule {}
