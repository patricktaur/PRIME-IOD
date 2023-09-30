import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsContainerComponent } from './requests-container/requests-container.component';

@NgModule({
  declarations: [RequestsContainerComponent],
  imports: [CommonModule, 
    SharedModule, 
    SharedCompsModule, 
    RequestsRoutingModule]
})
export class RequestsModule {}
