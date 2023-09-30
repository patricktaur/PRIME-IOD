import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { PermissionGuard } from '@app/core/authentication/permission.guard';
import { NoPermissionComponent } from '../../no-permission/no-permission.component';
import { StudyImiContainerComponent } from './study-imi-container/study-imi-container.component';
import { ImiStudyStatusComponent } from '@app/prism/study/imi-tabs/imi-study-status/imi-study-status.component';
import { ImiStudyTimelinesComponent } from '@app/prism/study/imi-tabs/imi-study-timelines/imi-study-timelines.component';
import { ImiStudyTimelinesViewComponent } from '../../imi-tabs/imi-study-timelines-view/imi-study-timelines-view.component';
import { ImiStudyStatusViewComponent } from '../../imi-tabs/imi-study-status-view/imi-study-status-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {ImiStudyEditComponent} from '../../imi-tabs/imi-study-edit/imi-study-edit.component'

const routes: Routes = [
  {
    path: '',
    component: StudyImiContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'description-assumptions'
      },
      {
        path: 'review-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-review/imi-review.module').then(m => m.ImiReviewGroupModule)
      },
      {
        path: 'imi-study-edit',
        component: ImiStudyEditComponent
      },
      {
        path: 'description-assumptions',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-details-group/imi-details-group.module').then(
            m => m.ImiDetailsGroupModule
          )
      },

      {
        path: 'resources',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-study-resources/imi-study-resources.module').then(
            m => m.ImiStudyResourcesModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-imi-resources-edit', redirectUrl: 'resources-view' }
      },
      {
        path: 'resources-view',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-study-resources/imi-study-resources.module').then(
            m => m.ImiStudyResourcesModule
          ),
        data: {
          mode: 'view'
        }
      },
      
      {
        path: 'status',
        component: ImiStudyStatusComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-imi-status-edit', redirectUrl: 'status-view' }
      },
      {
        path: 'status-view',
        component: ImiStudyStatusViewComponent
      },
      {
        path: 'timelines',
        component: ImiStudyTimelinesComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [ PermissionGuard ],
        data: { compCode: 'study-imi-timelines-edit', redirectUrl: 'timelines-view' }
      },
      {
        path: 'timelines-view',
        component: ImiStudyTimelinesViewComponent
      },
      {
        path: 'cdms-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-cdms-group/imi-cdms-group.module').then(m => m.ImiCdmsGroupModule)
      },
      {
        path: 'trackers-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-trackers-group/imi-trackers-group.module').then(
            m => m.ImiTrackersGroupModule
          )
      },

      {
        path: 'cds-group',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-cds-group/study-cds-group.module').then(m => m.StudyCdsGroupModule)
      },

      {
        path: 'cdms-group',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-cdms-group/imi-cdms-group.module').then(m => m.ImiCdmsGroupModule)
      },
      {
        path: '**',
        component: NoPermissionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyImiRoutingModule {}
