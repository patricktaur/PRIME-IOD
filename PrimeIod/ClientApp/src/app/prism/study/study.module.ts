import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';

import { StudyRoutingModule } from '@app/prism/study/study-routing.module';
import { StudyContainerComponent } from './study-container/study-container.component';
import { StudyReviewTabsModule } from '@app/prism/study/study-review-tabs/study-review-tabs.module';
import { StudyDashboardHorizontalComponent } from './study-dashboards/study-dashboard-horizontal/study-dashboard-horizontal.component';
// import { StudyReviewModule } from '@app/prism/study/study-review/study-review.module';
import { StudyTabsModule } from '@app/prism/study/study-tabs/study-tabs.module';
import { CrmSharedModule } from '@app/prism/crm/crm-shared/crm-shared.module';
import { StudyInfoComponent } from './study-info/study-info.component';
import { ImiStudyStatusComponent } from './imi-tabs/imi-study-status/imi-study-status.component';
import { ImiStudyTimelinesComponent } from './imi-tabs/imi-study-timelines/imi-study-timelines.component';
import { DmMenuComponent } from './menu/dm-menu/dm-menu.component';
import { ImiMenuComponent } from './menu/imi-menu/imi-menu.component';
// import { CrmMenuComponent } from './menu/crm-menu/crm-menu.component';
import { DmImiMenuComponent } from './menu/dm-imi-menu/dm-imi-menu.component';
import { StudyDmDashboardComponent } from './study-dashboards/study-dm-dashboard/study-dm-dashboard.component';
import { StudyImiDashboardComponent } from './study-dashboards/study-imi-dashboard/study-imi-dashboard.component';
import { ImiStudyTimelinesViewComponent } from './imi-tabs/imi-study-timelines-view/imi-study-timelines-view.component';
import { ImiStudyStatusViewComponent } from './imi-tabs/imi-study-status-view/imi-study-status-view.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';
import { ImiStudyEditComponent } from './imi-tabs/imi-study-edit/imi-study-edit.component';
import { DmStudyMembersShellComponent } from './study-shared-comps/dm-study-members-shell/dm-study-members-shell.component';
import { DmStudyMembersBaseComponent } from './study-shared-comps/dm-study-members-base/dm-study-members-base.component';
// import { StudyCrmDashboardComponent } from './study-dashboards/study-crm-dashboard/study-crm-dashboard.component';
@NgModule({
  declarations: [
    StudyContainerComponent,
    StudyDashboardHorizontalComponent,
    StudyInfoComponent,
    ImiStudyStatusComponent,
    ImiStudyTimelinesComponent,
    DmMenuComponent,
    ImiMenuComponent,
    // CrmMenuComponent,
    DmImiMenuComponent,
    StudyDmDashboardComponent,
    StudyImiDashboardComponent,
    ImiStudyTimelinesViewComponent,
    ImiStudyStatusViewComponent,
    NoPermissionComponent,
    ImiStudyEditComponent,
    DmStudyMembersShellComponent,
    DmStudyMembersBaseComponent
    // StudyCrmDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    StudyRoutingModule,
    StudyReviewTabsModule,
    StudyTabsModule,
    CrmSharedModule
    // StudyReviewModule
  ]
})
export class StudyModule {}
