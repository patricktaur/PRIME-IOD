import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CdmsSharedModule } from '@app/prism/study/study-tabs/study-cdms-group/cdms-shared/cdms-shared.module';

import { StudyCdmsGroupRoutingModule } from './study-cdms-group-routing.module';
import { StudyCdmsGroupContainerComponent } from './study-cdms-group-container/study-cdms-group-container.component';
import { StudyCdmsComponent } from './study-cdms/study-cdms.component';
import { StudyCdmsViewComponent } from './study-cdms-view/study-cdms-view.component';
import { StudyCdmsExtractSpecificationComponent } from './study-cdms-extract-specification/study-cdms-extract-specification.component';

@NgModule({
  declarations: [StudyCdmsGroupContainerComponent, StudyCdmsComponent, StudyCdmsViewComponent, StudyCdmsExtractSpecificationComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, CdmsSharedModule, StudyCdmsGroupRoutingModule]
})
export class StudyCdmsGroupModule {}
