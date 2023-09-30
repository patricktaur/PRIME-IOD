import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AppAccessGroupRoutingModule } from './group-access-routing.module';
import { AppAccessGroupContainerComponent } from './group-access-container/group-access-container.component';
import { AppAccessGroupListComponent } from './group-access-list/group-access-list.component';
import { AppAccessGroupEditComponent } from './group-access-edit/group-access-edit.component';
import { GroupAccessMembersComponent } from './group-access-members/group-access-members.component';

@NgModule({
  declarations: [
    AppAccessGroupContainerComponent,
    AppAccessGroupListComponent,
    AppAccessGroupEditComponent,
    GroupAccessMembersComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AppAccessGroupRoutingModule]
})
export class AppAccessGroupModule {}
