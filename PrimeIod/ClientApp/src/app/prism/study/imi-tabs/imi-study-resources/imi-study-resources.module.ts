import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiStudyResourcesRoutingModule } from './imi-study-resources-routing.module';
import { ImiStudyResourcesContainerComponent } from './imi-study-resources-container/imi-study-resources-container.component';
import { ImiStudyResourcesListComponent } from './imi-study-resources-list/imi-study-resources-list.component';
import { ImiStudyResourcesEditComponent } from './imi-study-resources-edit/imi-study-resources-edit.component';

@NgModule({
  declarations: [ImiStudyResourcesContainerComponent, ImiStudyResourcesListComponent, ImiStudyResourcesEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiStudyResourcesRoutingModule]
})
export class ImiStudyResourcesModule {}
