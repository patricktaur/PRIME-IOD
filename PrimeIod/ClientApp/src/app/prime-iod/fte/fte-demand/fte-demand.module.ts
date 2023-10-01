import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
// import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { FteDemandRoutingModule } from './fte-demand-routing.module';
import { FteDemandContainerComponent } from './fte-demand-container/fte-demand-container.component';
import { FteDemandListComponent } from './fte-demand-list/fte-demand-list.component';
import { FteDemandEditComponent } from './fte-demand-edit/fte-demand-edit.component';

@NgModule({
  declarations: [
    FteDemandContainerComponent,
    FteDemandListComponent,
    FteDemandEditComponent
  ],
  imports: [CommonModule, SharedModule, 
    // SharedCompsModule, 
    FteDemandRoutingModule]
})
export class  FteDemandModule {}
