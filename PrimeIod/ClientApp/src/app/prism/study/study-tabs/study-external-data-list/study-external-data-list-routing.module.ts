import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyExternalDataListContainerComponent } from './study-external-data-list-container/study-external-data-list-container.component';
import { StudyExternalDataListListComponent } from './study-external-data-list-list/study-external-data-list-list.component';
import { StudyExternalDataListEditComponent } from './study-external-data-list-edit/study-external-data-list-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyExternalDataListContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyExternalDataListListComponent
      },
      {
        path: 'edit',
        component: StudyExternalDataListEditComponent,
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
export class StudyExternalDataListRoutingModule {}
