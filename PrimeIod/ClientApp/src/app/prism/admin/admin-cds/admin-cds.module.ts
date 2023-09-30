import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminCdsRoutingModule } from './admin-cds-routing.module';
import { AdminCdsContainerComponent } from './admin-cds-container/admin-cds-container.component';

import { DevCategoryListComponent } from './dev-category-list/dev-category-list.component';
import { DevCategoryEditComponent } from './dev-category-edit/dev-category-edit.component';
import { DevCategoryFilterComponent } from './dev-category-filter/dev-category-filter.component';


@NgModule({
  declarations: [
    AdminCdsContainerComponent,
    DevCategoryListComponent,
    DevCategoryEditComponent,
    DevCategoryFilterComponent,
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminCdsRoutingModule]
})
export class  AdminCdsModule {}
