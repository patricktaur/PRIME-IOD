import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { AdminUploadsDmRoutingModule } from './admin-uploads-dm-routing.module';
import { AdminUploadsDmContainerComponent } from './admin-uploads-dm-container/admin-uploads-dm-container.component';

import { FteListComponent } from './fte/fte-list/fte-list.component';
import { FteResourceListComponent } from './fte-resource/fte-resource-list/fte-resource-list.component';
import { PageListComponent } from './page/page-list/page-list.component';

@NgModule({
  declarations: [
    AdminUploadsDmContainerComponent,
    FteListComponent,
    FteResourceListComponent,
    PageListComponent
    
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, AdminUploadsDmRoutingModule]
})
export class  AdminUploadsDmModule {}
