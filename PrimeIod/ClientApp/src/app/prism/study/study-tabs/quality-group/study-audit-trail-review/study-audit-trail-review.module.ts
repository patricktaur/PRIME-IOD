import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyAuditTrailReviewRoutingModule } from './study-audit-trail-review-routing.module';
import { StudyAuditTrailReviewListComponent } from './study-audit-trail-review-list/study-audit-trail-review-list.component';
import { StudyAuditTrailReviewEditComponent } from './study-audit-trail-review-edit/study-audit-trail-review-edit.component';
import { StudyAuditTrailReviewContainerComponent } from './study-audit-trail-review-container/study-audit-trail-review-container.component';
import { SharedModule } from '@app/shared';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';


@NgModule({
  declarations: [
    StudyAuditTrailReviewListComponent,
    StudyAuditTrailReviewEditComponent,
    StudyAuditTrailReviewContainerComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    SharedCompsModule,
    StudyAuditTrailReviewRoutingModule
  ]
})
export class StudyAuditTrailReviewModule { }
