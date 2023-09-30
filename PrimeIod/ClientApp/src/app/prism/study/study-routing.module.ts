import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyContainerComponent } from '@app/prism/study/study-container/study-container.component';
import { StudyLocalLabsComponent } from '@app/prism/study/study-tabs/study-local-labs/study-local-labs.component';
import { DatabaseLockDashboardFollowupDblComponent } from '@app/prism/study/study-tabs/database-lock-dashboard-followup-dbl/database-lock-dashboard-followup-dbl.component';
// import { OfflineChecksComponent } from '@app/prism/study/study-review-tabs/study-review/study-offline-checks/offline-checks.component';
import { StudyInfoComponent } from '@app/prism/study/study-info/study-info.component';
import { FteComputationsComponent } from '@app/prism/study/study-tabs/study-fte-computations/fte-computations.component';
import { StudyOfflineIgnoreComponent } from '@app/prism/study/study-review-tabs/study-review/study-offline-ignore/study-offline-ignore.component';
import { ImiStudyStatusComponent } from '@app/prism/study/imi-tabs/imi-study-status/imi-study-status.component';
import { ImiStudyTimelinesComponent } from '@app/prism/study/imi-tabs/imi-study-timelines/imi-study-timelines.component';
const routes: Routes = [
  {
    path: '',
    component: StudyContainerComponent
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'dm-review'
    //   },
    //   {
    //     path: 'dm-review',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-review-tabs/study-review/study-review.module').then(m => m.StudyReviewModule)
    //   },
    //   {
    //     path: 'dm-description-assumptions',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-review-tabs/study-details-container/study-details-container.module').then(
    //         m => m.StudyDetailsContainerModule
    //       )
    //   },

    //   {
    //     path: 'dm-resources-group',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-tabs/study-resources-group/study-resources-group.module').then(
    //         m => m.StudyResourcesGroupModule
    //       )
    //   },

    //   {
    //     path: 'dm-timeline',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-review-tabs/study-timeline/study-timeline.module').then(
    //         m => m.StudyTimelineModule
    //       )
    //   },

    //   {
    //     path: 'dm-status-pageflow',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-review-tabs/study-status-pageflow/study-status-pageflow.module').then(
    //         m => m.StudyStatusPageFlowModule
    //       )
    //   },

    //   {
    //     path: 'dm-external-data-list',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-tabs/study-external-data-list/study-external-data-list.module').then(
    //         m => m.StudyExternalDataListModule
    //       )
    //   },
    //   {
    //     path: 'dm-tasks',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-review-tabs/study-tasks/study-tasks.module').then(m => m.StudyTasksModule)
    //   },

    //   {
    //     path: 'dm-cdms',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-tabs/study-cdms-group/study-cdms-group.module').then(
    //         m => m.StudyCdmsGroupModule
    //       )
    //   },
    //   {
    //     path: 'dm-cds',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-tabs/study-cds-group/study-cds-group.module').then(m => m.StudyCdsGroupModule)
    //   },

    //   {
    //     path: 'dm-quality-group',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-tabs/quality-group/quality-group.module').then(m => m.QualityGroupModule)
    //   },
    //   {
    //     path: 'dm-local-labs',
    //     component: StudyLocalLabsComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   },
    //   // { // not required
    //   //   path: 'offline-ignore',
    //   //   component: StudyOfflineIgnoreComponent,
    //   //   canDeactivate: [CanDeactivateGuard]
    //   // },
    //   {
    //     path: 'dbl-main',
    //     component: DatabaseLockDashboardMainDblComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   },

    //   // { // not required
    //   //   path: 'dbl-followup',
    //   //   component: DatabaseLockDashboardFollowupDblComponent,
    //   //   canDeactivate: [CanDeactivateGuard]
    //   // },

    //   {
    //     path: 'gsk-group',
    //     loadChildren: () =>
    //       import('@app/prism/study/study-tabs/study-gsk-group/study-gsk-group.module').then(m => m.StudyGskGroupModule)
    //   },
    //   {
    //     path: 'fte-computations',
    //     component: FteComputationsComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   },

    //   {
    //     path: 'imi-review-group',
    //     loadChildren: () =>
    //       import('@app/prism/study/imi-tabs/imi-review/imi-review.module').then(m => m.ImiReviewGroupModule)
    //   },
    //   {
    //     path: 'imi-description-assumptions',
    //     loadChildren: () =>
    //       import('@app/prism/study/imi-tabs/imi-details-group/imi-details-group.module').then(
    //         m => m.ImiDetailsGroupModule
    //       )
    //   },

    //   {
    //     path: 'imi-resources',
    //     loadChildren: () =>
    //       import('@app/prism/study/imi-tabs/imi-study-resources/imi-study-resources.module').then(
    //         m => m.ImiStudyResourcesModule
    //       )
    //   },

    //   {
    //     path: 'imi-status',
    //     component: ImiStudyStatusComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   },
    //   {
    //     path: 'imi-timelines',
    //     component: ImiStudyTimelinesComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   },
    //   {
    //     path: 'imi-cdms-group',
    //     loadChildren: () =>
    //       import('@app/prism/study/imi-tabs/imi-cdms-group/imi-cdms-group.module').then(m => m.ImiCdmsGroupModule)
    //   },
    //   {
    //     path: 'imi-trackers-group',
    //     loadChildren: () =>
    //       import('@app/prism/study/imi-tabs/imi-trackers-group/imi-trackers-group.module').then(
    //         m => m.ImiTrackersGroupModule
    //       )
    //   },
    //   {
    //     path: 'crm-tabs',
    //     loadChildren: () => import('@app/prism/crm/crm-tabs/crm-tabs.module').then(m => m.CrmTabsModule)
    //   },

    //   {
    //     path: 'study-info',
    //     component: StudyInfoComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
