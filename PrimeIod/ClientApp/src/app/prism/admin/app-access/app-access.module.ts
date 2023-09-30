import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AppAccessRoutingModule } from './app-access-routing.module';
import { AppAccessContainerComponent } from './app-access-container/app-access-container.component';
import { AppAccessViewComponent } from './app-access-view/app-access-view.component';
import { CompPermissionsComponent } from './comp-permissions/comp-permissions.component';

@NgModule({
  declarations: [AppAccessContainerComponent, AppAccessViewComponent, CompPermissionsComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, AppAccessRoutingModule],
  exports: [SharedCompsModule, AppAccessRoutingModule, CompPermissionsComponent]
})
export class AppAccessModule {}
