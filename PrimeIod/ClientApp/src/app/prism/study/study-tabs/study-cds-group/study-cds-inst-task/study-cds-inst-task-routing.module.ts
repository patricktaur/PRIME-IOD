import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSInstTaskContainerComponent } from './study-cds-inst-task-container/study-cds-inst-task-container.component';
import { StudyCDSInstTaskListComponent } from './study-cds-inst-task-list/study-cds-inst-task-list.component';
import { StudyCDSInstTaskEditComponent } from './study-cds-inst-task-item-group/study-cds-inst-task-edit/study-cds-inst-task-edit.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
const routes: Routes = [
  {
    path: '',
    component: StudyCDSInstTaskContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCDSInstTaskListComponent
      },
      {
        path: 'new',
        component: StudyCDSInstTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task-item-group/study-cds-inst-task-item-group.module'
          ).then(m => m.StudyCdsInstTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCDSInstTaskRoutingModule {}
