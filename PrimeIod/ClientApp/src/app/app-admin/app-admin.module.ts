import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AppAdminRoutingModule } from '@app/app-admin/app-admin-routing.module';

import { UsersComponent } from '@app/app-admin/users/users.component';
import { UserFormComponent } from '@app/app-admin/users/user-form/user-form.component';
import { RolesComponent } from '@app/app-admin/roles/roles.component';
import { RolesFormComponent } from '@app/app-admin/roles/roles-form/roles-form.component';
@NgModule({
  declarations: [UsersComponent, UserFormComponent, RolesComponent, RolesFormComponent],
  imports: [CommonModule, SharedModule, AppAdminRoutingModule],
  entryComponents: [UsersComponent, UserFormComponent, RolesComponent, RolesFormComponent]
})
export class AppAdminModule {}
