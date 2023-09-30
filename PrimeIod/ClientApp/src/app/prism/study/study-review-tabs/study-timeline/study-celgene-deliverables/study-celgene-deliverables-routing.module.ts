import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCelgeneDeliverablesContainerComponent } from './study-celgene-deliverables-container/study-celgene-deliverables-container.component';
import { StudyCelgeneDeliverablesListComponent } from './study-celgene-deliverables-list/study-celgene-deliverables-list.component';
import { StudyCelgeneDeliverablesEditComponent } from './study-celgene-deliverables-edit/study-celgene-deliverables-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCelgeneDeliverablesContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCelgeneDeliverablesListComponent
      },
      {
        path: 'edit',
        component: StudyCelgeneDeliverablesEditComponent,
        canDeactivate: [CanDeactivateGuard],
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
export class StudyCelgeneDeliverablesRoutingModule {}
