import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
// import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyRoutingModule } from './study-routing.module';
import { StudyContainerComponent } from './study-container/study-container.component';
import { StudyListComponent } from './study-list/study-list.component';
import { StudyEditComponent } from './study-edit/study-edit.component';

@NgModule({
  declarations: [
    StudyContainerComponent,
    StudyListComponent,
    StudyEditComponent
  ],
  imports: [CommonModule, SharedModule, 
    // SharedCompsModule, 
    StudyRoutingModule]
})
export class  StudyModule {}
