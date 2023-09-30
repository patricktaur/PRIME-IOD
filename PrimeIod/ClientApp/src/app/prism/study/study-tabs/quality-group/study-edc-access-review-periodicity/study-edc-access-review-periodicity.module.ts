import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyEdcAccessReviewPeriodicityRoutingModule } from './study-edc-access-review-periodicity-routing.module';
import { StudyEdcAccessReviewPeriodicityContainerComponent } from './study-edc-access-review-periodicity-container/study-edc-access-review-periodicity-container.component';
import { StudyEdcAccessReviewPeriodicityListComponent } from './study-edc-access-review-periodicity-list/study-edc-access-review-periodicity-list.component';
import { StudyEdcAccessReviewPeriodicityEditComponent } from './study-edc-access-review-periodicity-edit/study-edc-access-review-periodicity-edit.component';

@NgModule({
  declarations: [
    StudyEdcAccessReviewPeriodicityContainerComponent,
    StudyEdcAccessReviewPeriodicityListComponent,
    StudyEdcAccessReviewPeriodicityEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyEdcAccessReviewPeriodicityRoutingModule]
})
export class StudyEdcAccessReviewPeriodicityModule {}
