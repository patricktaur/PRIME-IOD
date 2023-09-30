import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyExternalDataListRoutingModule } from './study-external-data-list-routing.module';
import { StudyExternalDataListContainerComponent } from './study-external-data-list-container/study-external-data-list-container.component';
import { StudyExternalDataListListComponent } from './study-external-data-list-list/study-external-data-list-list.component';
import { StudyExternalDataListEditComponent } from './study-external-data-list-edit/study-external-data-list-edit.component';

@NgModule({
  declarations: [
    StudyExternalDataListContainerComponent,
    StudyExternalDataListListComponent,
    StudyExternalDataListEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyExternalDataListRoutingModule]
})
export class StudyExternalDataListModule {}
