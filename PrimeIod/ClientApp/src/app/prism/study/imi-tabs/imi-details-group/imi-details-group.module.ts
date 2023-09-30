import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { ImiDetailsGroupRoutingModule } from './imi-details-group-routing.module';
import { ImiDetailsGroupContainerComponent } from './imi-details-group-container/imi-details-group-container.component';
import { ImiStudyDescriptionComponent } from './imi-study-description/imi-study-description.component';
import { ImiStudyAssumptionsComponent } from './imi-study-assumptions/imi-study-assumptions.component';
import { ImiStudyDescriptionViewComponent } from './imi-study-description-view/imi-study-description-view.component';
import { ImiStudyAssumptionsViewComponent } from './imi-study-assumptions-view/imi-study-assumptions-view.component';

@NgModule({
  declarations: [ImiDetailsGroupContainerComponent, ImiStudyDescriptionComponent, ImiStudyAssumptionsComponent, ImiStudyDescriptionViewComponent, ImiStudyAssumptionsViewComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, ImiDetailsGroupRoutingModule]
})
export class ImiDetailsGroupModule {}
