import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyAuditTrailReviewContainerComponent } from './study-audit-trail-review-container/study-audit-trail-review-container.component';
import { StudyAuditTrailReviewListComponent } from './study-audit-trail-review-list/study-audit-trail-review-list.component';
import { StudyAuditTrailReviewEditComponent } from './study-audit-trail-review-edit/study-audit-trail-review-edit.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: StudyAuditTrailReviewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyAuditTrailReviewListComponent
      },
      {
        path: 'edit',
        component: StudyAuditTrailReviewEditComponent,
        canDeactivate: [ CanDeactivateGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyAuditTrailReviewRoutingModule { }