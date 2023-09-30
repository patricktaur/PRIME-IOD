import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

// import { TblUserRoutingModule } from './tbl-user-routing.module';
import { TblUserListComponent } from './tbl-user-list/tbl-user-list.component';
import { TblUserEditComponent } from './tbl-user-list/tbl-user-edit/tbl-user-edit.component';
@NgModule({
  declarations: [TblUserListComponent, TblUserEditComponent],
  imports: [
    CommonModule,
    SharedModule
    // TblUserRoutingModule
  ],
  entryComponents: [TblUserEditComponent]
})
export class TblUserModule {}
