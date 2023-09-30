import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyFteReviewContainerComponent } from './study-fte-review-container/study-fte-review-container.component';
import { StudyFteReviewListComponent } from './study-fte-review-list/study-fte-review-list.component';
import { StudyFteReviewEditComponent } from './study-fte-review-edit/study-fte-review-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyFteReviewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyFteReviewListComponent
      },
      {
        path: 'edit',
        component: StudyFteReviewEditComponent,
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
export class StudyFteReviewRoutingModule {}
