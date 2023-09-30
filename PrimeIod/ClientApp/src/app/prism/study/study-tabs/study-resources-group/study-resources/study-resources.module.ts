import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyResourcesRoutingModule } from './study-resources-routing.module';
import { StudyResourcesContainerComponent } from './study-resources-container/study-resources-container.component';
import { StudyResourcesListComponent } from './study-resources-list/study-resources-list.component';
import { StudyResourcesEditComponent } from './study-resources-edit/study-resources-edit.component';
import { StudyResourceDashboardComponent } from './study-resource-dashboard/study-resource-dashboard.component';

@NgModule({
  declarations: [
    StudyResourcesContainerComponent,
    StudyResourcesListComponent,
    StudyResourcesEditComponent,
    StudyResourceDashboardComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyResourcesRoutingModule]
})
export class StudyResourcesModule {}
