import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyEdcAccessReviewPeriodicityContainerComponent } from './study-edc-access-review-periodicity-container/study-edc-access-review-periodicity-container.component';
import { StudyEdcAccessReviewPeriodicityListComponent } from './study-edc-access-review-periodicity-list/study-edc-access-review-periodicity-list.component';
import { StudyEdcAccessReviewPeriodicityEditComponent } from './study-edc-access-review-periodicity-edit/study-edc-access-review-periodicity-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { PermissionGuard } from '@app/core/authentication/permission.guard';
const routes: Routes = [
  {
    path: '',
    component: StudyEdcAccessReviewPeriodicityContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyEdcAccessReviewPeriodicityListComponent
      },
      {
        path: 'edit',
        component: StudyEdcAccessReviewPeriodicityEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyEdcAccessReviewPeriodicityRoutingModule {}
