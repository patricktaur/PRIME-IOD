import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from '@app/prism/masters/masters-routing.module';
import { TblTaskCategoryModule } from '@app/prism/masters/tbl-task-category/tbl-task-category.module';
import { TblAnnouncementsModule } from '@app/prism/masters/tbl-announcements/tbl-announcements.module';
import { TblParamModule } from '@app/prism/masters/tbl-param/tbl-param.module';
import { TblUserModule } from '@app/prism/masters/tbl-user/tbl-user.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MastersRoutingModule,
    TblTaskCategoryModule,
    TblAnnouncementsModule,
    TblParamModule,
    TblUserModule
  ]
})
export class MastersModule {}
