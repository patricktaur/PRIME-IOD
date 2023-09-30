import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AppAdminGroupRoutingModule } from './app-admin-group-routing.module';
import { AppAdminGroupContainerComponent } from './app-admin-group-container/app-admin-group-container.component';

@NgModule({
  declarations: [AppAdminGroupContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, AppAdminGroupRoutingModule]
})
export class AppAdminGroupModule {}
