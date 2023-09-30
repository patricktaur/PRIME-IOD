import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadContainerComponent } from './upload-container/upload-container.component';
// import { FteListComponent } from './fte/fte-list/fte-list.component';
// import { FteResourceListComponent } from './fte-resource/fte-resource-list/fte-resource-list.component';
// import { ImiTimelinesListComponent } from './imi-timelines/imi-timelines-list/imi-timelines-list.component';
// import { PageListComponent } from './page/page-list/page-list.component';

@NgModule({
  declarations: [
    UploadContainerComponent,
    // FteListComponent,
    // FteResourceListComponent,
    // ImiTimelinesListComponent,
    // PageListComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, UploadRoutingModule]
})
export class UploadModule {}
