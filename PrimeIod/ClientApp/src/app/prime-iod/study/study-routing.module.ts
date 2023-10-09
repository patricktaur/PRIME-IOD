import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyContainerComponent } from './study-container/study-container.component';
import { StudyListComponent } from './study-list/study-list.component';
import { StudyEditComponent } from './study-edit/study-edit.component';
const routes: Routes = [
  {
    path: '',
    component: StudyContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyListComponent
      },
      {
        path: 'edit',
        component: StudyEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
