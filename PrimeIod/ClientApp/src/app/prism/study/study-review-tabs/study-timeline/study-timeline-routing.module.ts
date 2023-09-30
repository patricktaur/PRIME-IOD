import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { StudyTimelineContainerComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-container/study-timeline-container.component';
import { StudyTimelineComponent } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline/study-timeline.component';
import { StudyTimelineViewComponent } from './study-timeline-view/study-timeline-view.component';
const routes: Routes = [
  {
    path: '',
    component: StudyTimelineContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'time-line'
      },

      {
        path: 'time-line',
        component: StudyTimelineComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
          data: {
            parentPath: 'study/dm/timeline-group',
          }
      },

      {
        path: 'time-line-view',
        component: StudyTimelineViewComponent
      },

      {
        path: 'deliverables',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-timeline/study-deliverables/study-deliverables.module').then(
            m => m.StudyDeliverablesModule
          ),
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-deliverables-edit', redirectUrl: 'deliverables-view' }
      },

      {
        path: 'deliverables-view',
        loadChildren: () =>
          import('@app/prism/study/study-review-tabs/study-timeline/study-deliverables/study-deliverables.module').then(
            m => m.StudyDeliverablesModule
          ),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'celgene-deliverables',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-timeline/study-celgene-deliverables/study-celgene-deliverables.module'
          ).then(m => m.StudyCelgeneDeliverablesModule),
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-celegene-deliverables-edit', redirectUrl: 'celgene-deliverables-view' }
      },

      {
        path: 'celgene-deliverables-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-timeline/study-celgene-deliverables/study-celgene-deliverables.module'
          ).then(m => m.StudyCelgeneDeliverablesModule),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'interim-locks',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-locks/study-timeline-interim-locks.module'
          ).then(m => m.StudyTimelineInterimLocksModule),
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-interim-locks-edit', redirectUrl: 'interim-locks-view' }
      },
      
      {
        path: 'interim-locks-view',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-locks/study-timeline-interim-locks.module'
          ).then(m => m.StudyTimelineInterimLocksModule),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'interim-analysis',
        loadChildren: () =>
          import(
            '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-analysis/study-timeline-interim-analysis.module'
          ).then(m => m.StudyTimelineInterimAnalysisModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyTimelineRoutingModule {}
