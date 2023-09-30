import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CrmStudyRequestRoutingModule } from './crm-study-request-routing.module';
import { CrmStudyContainterComponent } from './crm-study-containter/crm-study-containter.component';
import { CrmStudyListComponent } from './crm-study-list/crm-study-list.component';
import { CrmStudyEditComponent } from './crm-study-edit/crm-study-edit.component';
import { CrmStudyFilterComponent } from './crm-study-filter/crm-study-filter.component';
import { CrmStudyApprovalListComponent } from './crm-study-approval-list/crm-study-approval-list.component';
import { CrmStudyApprovalEditComponent } from './crm-study-approval-edit/crm-study-approval-edit.component';

@NgModule({
  imports: [CommonModule, SharedModule, SharedCompsModule, CrmStudyRequestRoutingModule],
  declarations: [CrmStudyContainterComponent, CrmStudyListComponent, CrmStudyEditComponent, CrmStudyFilterComponent, CrmStudyApprovalListComponent, CrmStudyApprovalEditComponent]
})
export class CrmStudyRequestModule {}