import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminProcImpTrackerRoutingModule } from './admin-proc-imp-tracker-routing.module';
import { AdminProcImpTrackerContainerComponent } from './admin-proc-imp-tracker-container/admin-proc-imp-tracker-container.component';

import { ProcessImprovementCategoryListComponent } from './process-improvement-category-list/process-improvement-category-list.component';
import { ProcessImprovementCategoryEditComponent } from './process-improvement-category-edit/process-improvement-category-edit.component';
import { ProcessImprovementCategoryFilterComponent } from './process-improvement-category-filter/process-improvement-category-filter.component';

@NgModule({
  declarations: [
    AdminProcImpTrackerContainerComponent,
    ProcessImprovementCategoryListComponent, 
    ProcessImprovementCategoryEditComponent,
    ProcessImprovementCategoryFilterComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminProcImpTrackerRoutingModule]
})
export class  AdminProcImpTrackerModule {}
