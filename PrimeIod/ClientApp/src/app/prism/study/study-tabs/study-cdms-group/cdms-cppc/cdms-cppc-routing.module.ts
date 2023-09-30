import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CdmsCppcContainerComponent } from './cdms-cppc-container/cdms-cppc-container.component';
import { CdmsCppcListComponent } from './cdms-cppc-list/cdms-cppc-list.component';
import { CdmsCppcEditComponent } from './cdms-cppc-edit/cdms-cppc-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: CdmsCppcContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CdmsCppcListComponent
      },
      {
        path: 'edit',
        component: CdmsCppcEditComponent,
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
export class CdmsCppcRoutingModule {}
