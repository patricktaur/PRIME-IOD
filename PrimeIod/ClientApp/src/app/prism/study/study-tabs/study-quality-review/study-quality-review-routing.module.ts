import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyQualityReviewContainerComponent } from './study-quality-review-container/study-quality-review-container.component';
import { StudyQualityReviewListComponent } from './study-quality-review-list/study-quality-review-list.component';
import { StudyQualityReviewEditComponent } from './study-quality-review-edit/study-quality-review-edit.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
const routes: Routes = [
  {
    path: '',
    component: StudyQualityReviewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyQualityReviewListComponent
      },
      {
        path: 'edit',
        component: StudyQualityReviewEditComponent,
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
export class StudyQualityReviewRoutingModule {}
