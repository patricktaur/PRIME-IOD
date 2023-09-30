import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { GenerateFTEsRoutingModule } from './generateftes-routing.module';
import { GenerateftesContainerComponent } from './generateftes-container/generateftes-container.component';

@NgModule({
  declarations: [GenerateftesContainerComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, GenerateFTEsRoutingModule]
})
export class GenerateFTEsModule {}
