import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSCodingTaskContainerComponent } from './study-cds-coding-task-container/study-cds-coding-task-container.component';
import { StudyCDSCodingTaskListComponent } from './study-cds-coding-task-list/study-cds-coding-task-list.component';
import { StudyCDSCodingTaskEditComponent } from './study-cds-coding-task-item-group/study-cds-coding-task-edit/study-cds-coding-task-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCDSCodingTaskContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCDSCodingTaskListComponent
      },
      {
        path: 'new',
        component: StudyCDSCodingTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-task-item-group/study-cds-coding-task-item-group.module'
          ).then(m => m.StudyCdsCodingTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCDSCodingTaskRoutingModule {}
