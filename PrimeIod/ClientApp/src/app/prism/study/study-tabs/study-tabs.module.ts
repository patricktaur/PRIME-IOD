import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { StudyLocalLabsComponent } from './study-local-labs/study-local-labs.component';
import { DatabaseLockDashboardFollowupDblComponent } from './database-lock-dashboard-followup-dbl/database-lock-dashboard-followup-dbl.component';
// import { OfflineChecksComponent } from '../study-review-tabs/study-review/study-offline-checks/offline-checks.component';
import { FteComputationsComponent } from './study-fte-computations/fte-computations.component';
import { StudyKpiComponent } from './quality-group/study-kpi/study-kpi.component';
import { StudyOfflineIgnoreComponent } from '../study-review-tabs/study-review/study-offline-ignore/study-offline-ignore.component';
import { StudyLocalLabsViewComponent } from './study-local-labs-view/study-local-labs-view.component';
import { DatabaseLockDashboardMainDblComponent } from './database-lock-dashboard-main-dbl/database-lock-dashboard-main-dbl.component';
import { DatabaseLockDashboardMainDblViewComponent } from './database-lock-dashboard-main-dbl-view/database-lock-dashboard-main-dbl-view.component';
import { StudyEditComponent } from './study-edit/study-edit.component';

@NgModule({
  declarations: [
    StudyLocalLabsComponent,
    DatabaseLockDashboardMainDblComponent,
    DatabaseLockDashboardMainDblViewComponent,
    DatabaseLockDashboardFollowupDblComponent,
    // OfflineChecksComponent,
    FteComputationsComponent,
    StudyKpiComponent,
    StudyOfflineIgnoreComponent,
    StudyLocalLabsViewComponent,
    StudyEditComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class StudyTabsModule {}
