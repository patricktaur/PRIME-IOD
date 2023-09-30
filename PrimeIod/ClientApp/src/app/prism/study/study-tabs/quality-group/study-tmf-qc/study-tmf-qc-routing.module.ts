import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyTmfQcContainerComponent } from './study-tmf-qc-container/study-tmf-qc-container.component';
import { StudyTmfQcListComponent } from './study-tmf-qc-list/study-tmf-qc-list.component';
import { StudyTmfQcEditComponent } from './study-tmf-qc-edit/study-tmf-qc-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyTmfQcContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyTmfQcListComponent
      },
      {
        path: 'edit',
        component: StudyTmfQcEditComponent,
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
export class StudyTmfQcRoutingModule {}
