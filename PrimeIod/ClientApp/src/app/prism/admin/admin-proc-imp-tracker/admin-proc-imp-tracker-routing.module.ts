import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProcImpTrackerContainerComponent } from './admin-proc-imp-tracker-container/admin-proc-imp-tracker-container.component';
import { ProcessImprovementCategoryListComponent } from './process-improvement-category-list/process-improvement-category-list.component';
import { ProcessImprovementCategoryEditComponent } from './process-improvement-category-edit/process-improvement-category-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminProcImpTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ProcessImprovementCategoryListComponent
      },
      {
        path: 'edit',
        component: ProcessImprovementCategoryEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProcImpTrackerRoutingModule {}
