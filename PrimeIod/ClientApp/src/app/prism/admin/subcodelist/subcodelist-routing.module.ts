import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcodelistContainerComponent } from './subcodelist-container/subcodelist-container.component';
// import { DevCategoryListComponent } from './dev-category/dev-category-list/dev-category-list.component';
// import { DevCategoryEditComponent } from './dev-category/dev-category-edit/dev-category-edit.component';
// import { ProcessImprovementCategoryListComponent } from './process-improvement-category/process-improvement-category-list/process-improvement-category-list.component';
// import { ProcessImprovementCategoryEditComponent } from './process-improvement-category/process-improvement-category-edit/process-improvement-category-edit.component';
const routes: Routes = [
  {
    path: '',
    component: SubcodelistContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dev-category-list'
      },
     
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCodelistRoutingModule {}
