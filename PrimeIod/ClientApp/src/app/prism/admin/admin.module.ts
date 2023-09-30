import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminContainerComponent } from './admin-container/admin-container.component';

@NgModule({
  declarations: [AdminContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminRoutingModule]
})
export class AdminModule {}
