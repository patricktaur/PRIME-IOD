import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyCdsGroupRoutingModule } from './study-cds-group-routing.module';
import { StudyCdsGroupContainerComponent } from './study-cds-group-container/study-cds-group-container.component';
import { StudyCdsComponent } from './study-cds/study-cds.component';
import { StudyCdsViewComponent } from './study-cds-view/study-cds-view.component';

@NgModule({
  declarations: [StudyCdsGroupContainerComponent, StudyCdsComponent, StudyCdsViewComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyCdsGroupRoutingModule]
})
export class StudyCdsGroupModule {}
