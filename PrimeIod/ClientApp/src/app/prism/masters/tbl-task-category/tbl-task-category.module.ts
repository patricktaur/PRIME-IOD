import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

// import { TblTaskCategoryRoutingModule } from './tbl-task-category-routing.module';
import { TblTaskCategoryListComponent } from './tbl-task-category-list/tbl-task-category-list.component';
import { TblTaskCategoryEditComponent } from './tbl-task-category-list/tbl-task-category-edit/tbl-task-category-edit.component';
@NgModule({
  declarations: [TblTaskCategoryListComponent, TblTaskCategoryEditComponent],
  imports: [
    CommonModule,
    SharedModule
    // TblTaskCategoryRoutingModule
  ],
  entryComponents: [TblTaskCategoryEditComponent]
})
export class TblTaskCategoryModule {}
