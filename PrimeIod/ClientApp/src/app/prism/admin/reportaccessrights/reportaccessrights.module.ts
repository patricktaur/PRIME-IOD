import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ReportAccessRightsRoutingModule } from './reportaccessrights-routing.module';
import { ReportaccessrightsContainerComponent } from './reportaccessrights-container/reportaccessrights-container.component';

@NgModule({
  declarations: [ReportaccessrightsContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, ReportAccessRightsRoutingModule]
})
export class ReportAccessRightsModule {}
