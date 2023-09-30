import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminUploadsImiRoutingModule } from './admin-uploads-imi-routing.module';
import { AdminUploadsImiContainerComponent } from './admin-uploads-imi-container/admin-uploads-imi-container.component';
import { ImiTimelinesListComponent } from './imi-timelines/imi-timelines-list/imi-timelines-list.component';


@NgModule({
  declarations: [
    AdminUploadsImiContainerComponent,
    ImiTimelinesListComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminUploadsImiRoutingModule]
})
export class  AdminUploadsImiModule {}
