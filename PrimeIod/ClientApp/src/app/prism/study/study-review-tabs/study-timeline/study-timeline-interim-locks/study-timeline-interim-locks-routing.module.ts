import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyTimelineInterimLocksContainerComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-locks/study-timeline-interim-locks-container/study-timeline-interim-locks-container.component';
import { StudyTimelineInterimLocksListComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-locks/study-timeline-interim-locks-list/study-timeline-interim-locks-list.component';
import { StudyTimelineInterimLocksEditComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-locks/study-timeline-interim-locks-edit/study-timeline-interim-locks-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyTimelineInterimLocksContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyTimelineInterimLocksListComponent
      },
      {
        path: 'edit',
        component: StudyTimelineInterimLocksEditComponent,
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
export class StudyTimelineInterimLocksRoutingModule {}
