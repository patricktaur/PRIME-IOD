import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyResourcesContainerComponent } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources-container/study-resources-container.component';
import { StudyResourcesListComponent } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources-list/study-resources-list.component';
import { StudyResourcesEditComponent } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources-edit/study-resources-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyResourcesContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyResourcesListComponent
      },
      {
        path: 'edit',
        component: StudyResourcesEditComponent,
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
export class StudyResourcesRoutingModule {}
