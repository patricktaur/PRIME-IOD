import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSOutputTaskContainerComponent } from './study-cds-output-task-container/study-cds-output-task-container.component';
import { StudyCDSOutputTaskListComponent } from './study-cds-output-task-list/study-cds-output-task-list.component';
import { StudyCDSOutputTaskEditComponent } from './study-cds-output-task-item-group/study-cds-output-task-edit/study-cds-output-task-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCDSOutputTaskContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCDSOutputTaskListComponent
      },
      {
        path: 'new',
        component: StudyCDSOutputTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-task-item-group/study-cds-output-task-item-group.module'
          ).then(m => m.StudyCdsOutputTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCDSOutputTaskRoutingModule {}
