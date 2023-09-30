import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersContainerComponent } from './users-container/users-container.component';
import { UsersFilterComponent } from './users-filter/users-filter.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
  declarations: [UsersContainerComponent, UsersListComponent, UsersFilterComponent, UsersEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, UsersRoutingModule]
})
export class UsersModule {}
