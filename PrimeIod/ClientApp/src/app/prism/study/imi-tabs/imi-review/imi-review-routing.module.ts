import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { ImiReviewGroupContainerComponent } from './imi-review-container/imi-review-container.component';
import { ImiReviewComponent } from './imi-review/imi-review.component';
import { ImiReviewCatMainComponent } from './imi-review-categories/imi-review-cat-main/imi-review-cat-main.component';
import { ImiReviewSignOffComponent } from './imi-review-sign-off/imi-review-sign-off.component';
import { ImiStudyReviewHistoryComponent } from './imi-study-review-history/imi-study-review-history.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { ImiReviewSignOffViewComponent } from './imi-review-sign-off-view/imi-review-sign-off-view.component';
import { ImiReviewViewComponent } from './imi-review-view/imi-review-view.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
const routes: Routes = [
  {
    path: '',
    component: ImiReviewGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'imi-review-signoff'
      },
      // imi-review-signoff
      {
        path: 'imi-review-signoff',
        component: ImiReviewSignOffComponent,
        canDeactivate: [ CanDeactivateGuard ],
        canActivate: [PermissionGuard],
        //  data: {  parentPath: 'study/imi/review-group' },
      },
      {
        path: 'imi-review-signoff-view',
        component: ImiReviewSignOffViewComponent
      },
      // {
      //   path: 'imi-review',
      //   component: ImiReviewComponent
      // },
      {
        path: 'imi-review',
        component: ImiReviewComponent,
        canDeactivate: [ CanDeactivateGuard ],
        canActivate: [PermissionGuard]
      },
      {
        path: 'imi-review-categories',
        component: ImiReviewCatMainComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'imi-review-view',
        component: ImiReviewViewComponent
      },
      {
        path: 'imi-review-categories',
        component: ImiReviewCatMainComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard]
      },
      {
        path: 'issue-tracker',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-review/imi-study-issue-tracker/imi-study-issue-tracker.module').then(
            m => m.ImiStudyIssueTrackerModule
          ),
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-imi-project issue-tracker-edit', redirectUrl: 'issue-tracker-view' }
      },
      {
        path: 'issue-tracker-view',
        loadChildren: () =>
          import('@app/prism/study/imi-tabs/imi-review/imi-study-issue-tracker/imi-study-issue-tracker.module').then(
            m => m.ImiStudyIssueTrackerModule
          ),
        data: { mode: 'view' }
      },
      {
        path: 'review-history',
        component: ImiStudyReviewHistoryComponent,
        canActivate: [ PermissionGuard ],
        // data: { compCode: 'study-imi-project review-history-edit', redirectUrl: 'review-history-view' }
      },
      {
        path: 'review-history-view',
        component: ImiStudyReviewHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiReviewGroupRoutingModule {}
