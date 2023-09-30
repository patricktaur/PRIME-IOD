import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiStudyResourcesContainerComponent } from './imi-study-resources-container/imi-study-resources-container.component';
import { ImiStudyResourcesListComponent } from './imi-study-resources-list/imi-study-resources-list.component';
import { ImiStudyResourcesEditComponent } from './imi-study-resources-edit/imi-study-resources-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: ImiStudyResourcesContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ImiStudyResourcesListComponent
      },
      {
        path: 'edit',
        component: ImiStudyResourcesEditComponent,
        canDeactivate: [ CanDeactivateGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiStudyResourcesRoutingModule {}
