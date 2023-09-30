import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { StudyTasksRoutingModule } from './study-tasks-routing.module';
import { StudyTasksContainerComponent } from './study-tasks-container/study-tasks-container.component';
import { StudyTasksListComponent } from './study-tasks-list/study-tasks-list.component';
import { StudyTasksListViewComponent } from './study-tasks-list-view/study-tasks-list-view.component';

@NgModule({
  declarations: [StudyTasksContainerComponent, StudyTasksListComponent, StudyTasksListViewComponent],
  imports: [CommonModule, StudyTasksRoutingModule, SharedModule]
})
export class StudyTasksModule {}
