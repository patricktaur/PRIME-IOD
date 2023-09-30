import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyCelgeneDeliverablesRoutingModule } from './study-celgene-deliverables-routing.module';
import { StudyCelgeneDeliverablesContainerComponent } from './study-celgene-deliverables-container/study-celgene-deliverables-container.component';
import { StudyCelgeneDeliverablesListComponent } from './study-celgene-deliverables-list/study-celgene-deliverables-list.component';
import { StudyCelgeneDeliverablesEditComponent } from './study-celgene-deliverables-edit/study-celgene-deliverables-edit.component';

@NgModule({
  declarations: [
    StudyCelgeneDeliverablesContainerComponent,
    StudyCelgeneDeliverablesListComponent,
    StudyCelgeneDeliverablesEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyCelgeneDeliverablesRoutingModule]
})
export class StudyCelgeneDeliverablesModule {}
