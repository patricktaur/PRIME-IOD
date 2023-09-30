import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiReviewGroupRoutingModule } from './imi-review-routing.module';
import { ImiReviewGroupContainerComponent } from './imi-review-container/imi-review-container.component';
import { ImiReviewComponent } from './imi-review/imi-review.component';
import { ImiReviewSignOffComponent } from './imi-review-sign-off/imi-review-sign-off.component';
import { ProjStatDashReviewComponent } from './imi-review-components/proj-stat-dash-review/proj-stat-dash-review.component';
import { MilesStonesTimelinesComponent } from './imi-review-components/miles-stones-timelines/miles-stones-timelines.component';
import { RiskManagementComponent } from './imi-review-components/risk-management/risk-management.component';
import { StudyStartupComponent } from './imi-review-components/study-startup/study-startup.component';
import { ImgDataAndReadForecastingComponent } from './imi-review-components/img-data-and-read-forecasting/img-data-and-read-forecasting.component';
import { EdcDocAndDevComponent } from './imi-review-components/edc-doc-and-dev/edc-doc-and-dev.component';
import { ReaderTrainingComponent } from './imi-review-components/reader-training/reader-training.component';
import { ManagementOfReadersComponent } from './imi-review-components/management-of-readers/management-of-readers.component';
import { ImgReadMangMaintComponent } from './imi-review-components/img-read-mang-maint/img-read-mang-maint.component';
import { CrossFunctionalComponent } from './imi-review-components/cross-functional/cross-functional.component';
import { FinanceComponent } from './imi-review-components/finance/finance.component';
import { QualityAndTmfComponent } from './imi-review-components/quality-and-tmf/quality-and-tmf.component';
import { VendorManagementComponent } from './imi-review-components/vendor-management/vendor-management.component';
import { ResourcingAndStaffEngComponent } from './imi-review-components/resourcing-and-staff-eng/resourcing-and-staff-eng.component';
import { ClientSatisfactionComponent } from './imi-review-components/client-satisfaction/client-satisfaction.component';
import { CommunicationAndMeetingsComponent } from './imi-review-components/communication-and-meetings/communication-and-meetings.component';
import { ImiStudyReviewHistoryComponent } from './imi-study-review-history/imi-study-review-history.component';
import { ImiReviewSignOffViewComponent } from './imi-review-sign-off-view/imi-review-sign-off-view.component';
import { ImiReviewViewComponent } from './imi-review-view/imi-review-view.component';
import { ProjStatDashReviewViewComponent } from './imi-review-view-components/proj-stat-dash-review-view/proj-stat-dash-review-view.component';
import { ClientSatisfactionViewComponent } from './imi-review-view-components/client-satisfaction-view/client-satisfaction-view.component';
import { CommunicationAndMeetingsViewComponent } from './imi-review-view-components/communication-and-meetings-view/communication-and-meetings-view.component';
import { CrossFunctionalViewComponent } from './imi-review-view-components/cross-functional-view/cross-functional-view.component';
import { EdcDocAndDevViewComponent } from './imi-review-view-components/edc-doc-and-dev-view/edc-doc-and-dev-view.component';
import { FinanceViewComponent } from './imi-review-view-components/finance-view/finance-view.component';
import { ImgDataAndReadForecastingViewComponent } from './imi-review-view-components/img-data-and-read-forecasting-view/img-data-and-read-forecasting-view.component';
import { ImgReadMangMaintViewComponent } from './imi-review-view-components/img-read-mang-maint-view/img-read-mang-maint-view.component';
import { ManagementOfReadersViewComponent } from './imi-review-view-components/management-of-readers-view/management-of-readers-view.component';
import { MilesStonesTimelinesViewComponent } from './imi-review-view-components/miles-stones-timelines-view/miles-stones-timelines-view.component';
import { QualityAndTmfViewComponent } from './imi-review-view-components/quality-and-tmf-view/quality-and-tmf-view.component';
import { ReaderTrainingViewComponent } from './imi-review-view-components/reader-training-view/reader-training-view.component';
import { ResourcingAndStaffEngViewComponent } from './imi-review-view-components/resourcing-and-staff-eng-view/resourcing-and-staff-eng-view.component';
import { RiskManagementViewComponent } from './imi-review-view-components/risk-management-view/risk-management-view.component';
import { StudyStartupViewComponent } from './imi-review-view-components/study-startup-view/study-startup-view.component';
import { VendorManagementViewComponent } from './imi-review-view-components/vendor-management-view/vendor-management-view.component';
import { ImiReviewCatMainComponent } from './imi-review-categories/imi-review-cat-main/imi-review-cat-main.component';
import { ImiReviewCatDetailComponent } from './imi-review-categories/imi-review-cat-detail/imi-review-cat-detail.component';

@NgModule({
  declarations: [
    ImiReviewGroupContainerComponent,
    ImiReviewComponent,
    ImiReviewSignOffComponent,
    ProjStatDashReviewComponent,
    MilesStonesTimelinesComponent,
    RiskManagementComponent,
    StudyStartupComponent,
    ImgDataAndReadForecastingComponent,
    EdcDocAndDevComponent,
    ReaderTrainingComponent,
    ManagementOfReadersComponent,
    ImgReadMangMaintComponent,
    CrossFunctionalComponent,
    FinanceComponent,
    QualityAndTmfComponent,
    VendorManagementComponent,
    ResourcingAndStaffEngComponent,
    ClientSatisfactionComponent,
    CommunicationAndMeetingsComponent,
    ImiStudyReviewHistoryComponent,
    ImiReviewSignOffViewComponent,
    ImiReviewViewComponent,
    ProjStatDashReviewViewComponent,
    ClientSatisfactionViewComponent,
    CommunicationAndMeetingsViewComponent,
    CrossFunctionalViewComponent,
    EdcDocAndDevViewComponent,
    FinanceViewComponent,
    ImgDataAndReadForecastingViewComponent,
    ImgReadMangMaintViewComponent,
    ManagementOfReadersViewComponent,
    MilesStonesTimelinesViewComponent,
    QualityAndTmfViewComponent,
    ReaderTrainingViewComponent,
    ResourcingAndStaffEngViewComponent,
    RiskManagementViewComponent,
    StudyStartupViewComponent,
    VendorManagementViewComponent,
    ImiReviewCatMainComponent,
    ImiReviewCatDetailComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiReviewGroupRoutingModule]
})
export class ImiReviewGroupModule {}
