import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyDeliverablesContainerComponent } from './study-deliverables-container/study-deliverables-container.component';
import { StudyDeliverablesListComponent } from './study-deliverables-list/study-deliverables-list.component';
import { StudyDeliverablesEditComponent } from './study-deliverables-edit/study-deliverables-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyDeliverablesContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyDeliverablesListComponent
      },
      {
        path: 'edit',
        component: StudyDeliverablesEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'list' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyDeliverablesRoutingModule {}
