import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

// import { TblParamRoutingModule } from './tbl-param-routing.module';
import { TblParamListComponent } from './tbl-param-list/tbl-param-list.component';
import { TblParamEditComponent } from './tbl-param-list/tbl-param-edit/tbl-param-edit.component';
@NgModule({
  declarations: [TblParamListComponent, TblParamEditComponent],
  imports: [
    CommonModule,
    SharedModule
    // TblParamRoutingModule
  ],
  entryComponents: [TblParamEditComponent]
})
export class TblParamModule {}
