import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';

import { CrmStudyDetailsComponent } from './crm-study-details/crm-study-details.component';
import { CrmStudyAwardManagementComponent } from './crm-study-award-management/crm-study-award-management.component';
import { CrmStudyTimelinesComponent } from './crm-study-timelines/crm-study-timelines.component';
import { CrmStudyAnalysisPlanningComponent } from './crm-study-analysis-planning/crm-study-analysis-planning.component';

//Surekha:

import { CrmPopoverComponent } from '../crm-tabs/crm-study-analysis-planning/crm-popover.component';
import { CrmStudyDetailsViewComponent } from './crm-study-details-view/crm-study-details-view.component';
import { CrmStudyAwardManagementViewComponent } from './crm-study-award-management-view/crm-study-award-management-view.component';
import { CrmStudyTimelinesViewComponent } from './crm-study-timelines-view/crm-study-timelines-view.component';
import { CrmStudyAnalysisPlanningViewComponent } from './crm-study-analysis-planning-view/crm-study-analysis-planning-view.component';
@NgModule({
  declarations: [
    CrmStudyDetailsComponent,
    CrmStudyAwardManagementComponent,
    CrmStudyTimelinesComponent,
    CrmStudyAnalysisPlanningComponent,
    //Surekha:
    CrmPopoverComponent,
    CrmStudyDetailsViewComponent,
    CrmStudyAwardManagementViewComponent,
    CrmStudyTimelinesViewComponent,
    CrmStudyAnalysisPlanningViewComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule]
})
export class CrmTabsModule {}
