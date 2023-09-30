import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudySftpUserAccessReviewContainerComponent } from './study-sftp-user-access-review-container/study-sftp-user-access-review-container.component';
import { StudySftpUserAccessReviewListComponent } from './study-sftp-user-access-review-list/study-sftp-user-access-review-list.component';
import { StudySftpUserAccessReviewEditComponent } from './study-sftp-user-access-review-edit/study-sftp-user-access-review-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudySftpUserAccessReviewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudySftpUserAccessReviewListComponent
      },
      {
        path: 'edit',
        component: StudySftpUserAccessReviewEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudySFtpUserAccessReviewRoutingModule {}
