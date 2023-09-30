import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersModule } from '@app/prism/masters/masters.module';
import { ReportsModule } from '@app/prism/reports/reports.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
// import { FilterBaseComponent } from './reports/filters/filter-base/filter-base.component';
import { FilterBaseComponent } from '@app/prism/reports/filter-shell/filter-base/filter-base.component';
// import { FilterOneComponent } from './reports/filters/filter-one/filter-one.component';
import { FilterOneComponent } from '@app/prism/reports/filter-shell/filter-one/filter-one.component';

// import { FilterTwoComponent } from './reports/filters/filter-two/filter-two.component';

import { FilterTwoComponent } from '@app/prism/reports/filter-shell/filter-two/filter-two.component';

@NgModule({
  declarations: [FilterOneComponent, FilterTwoComponent],
  imports: [
    CommonModule, 
    MastersModule, 
    ReportsModule, 
    SharedCompsModule
  ]
})
export class PrismModule {}
