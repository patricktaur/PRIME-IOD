import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TblTaskCategoryListComponent } from '@app/prism/masters/tbl-task-category/tbl-task-category-list/tbl-task-category-list.component';
import { TblAnnouncementsListComponent } from '@app/prism/masters/tbl-announcements/tbl-announcements-list/tbl-announcements-list.component';
import { TblParamListComponent } from '@app/prism/masters/tbl-param/tbl-param-list/tbl-param-list.component';
import { TblUserListComponent } from '@app/prism/masters/tbl-user/tbl-user-list/tbl-user-list.component';
const routes: Routes = [
  { path: 'tbl-task-category', component: TblTaskCategoryListComponent },
  { path: 'tbl-announcements', component: TblAnnouncementsListComponent },
  { path: 'tbl-param', component: TblParamListComponent },
  { path: 'tbl-user', component: TblUserListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule {}
