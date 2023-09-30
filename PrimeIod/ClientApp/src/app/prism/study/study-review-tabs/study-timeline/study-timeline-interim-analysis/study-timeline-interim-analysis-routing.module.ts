import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyTimelineInterimAnalysisContainerComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-analysis/study-timeline-interim-analysis-container/study-timeline-interim-analysis-container.component';
import { StudyTimelineInterimAnalysisListComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-analysis/study-timeline-interim-analysis-list/study-timeline-interim-analysis-list.component';
import { StudyTimelineInterimAnalysisEditComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-analysis/study-timeline-interim-analysis-edit/study-timeline-interim-analysis-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { PermissionGuard } from '@app/core/authentication/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: StudyTimelineInterimAnalysisContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyTimelineInterimAnalysisListComponent
      },
      {
        path: 'edit',
        component: StudyTimelineInterimAnalysisEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        canActivate: [ PermissionGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'list-view' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyTimelineInterimAnalysisRoutingModule {}
