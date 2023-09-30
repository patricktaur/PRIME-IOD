import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

// import { TblAnnouncementsRoutingModule } from './tbl-announcements-routing.module';
import { TblAnnouncementsListComponent } from './tbl-announcements-list/tbl-announcements-list.component';
import { TblAnnouncementsEditComponent } from './tbl-announcements-list/tbl-announcements-edit/tbl-announcements-edit.component';
@NgModule({
  declarations: [TblAnnouncementsListComponent, TblAnnouncementsEditComponent],
  imports: [
    CommonModule,
    SharedModule
    // TblAnnouncementsRoutingModule
  ],
  entryComponents: [TblAnnouncementsEditComponent]
})
export class TblAnnouncementsModule {}
