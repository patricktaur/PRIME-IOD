import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyTmfQcRoutingModule } from './study-tmf-qc-routing.module';
import { StudyTmfQcContainerComponent } from './study-tmf-qc-container/study-tmf-qc-container.component';
import { StudyTmfQcListComponent } from './study-tmf-qc-list/study-tmf-qc-list.component';
import { StudyTmfQcEditComponent } from './study-tmf-qc-edit/study-tmf-qc-edit.component';

@NgModule({
  declarations: [StudyTmfQcContainerComponent, StudyTmfQcListComponent, StudyTmfQcEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyTmfQcRoutingModule]
})
export class StudyTmfQcModule {}
