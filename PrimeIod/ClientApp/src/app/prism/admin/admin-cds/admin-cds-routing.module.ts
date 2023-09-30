import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCdsContainerComponent } from './admin-cds-container/admin-cds-container.component';

// import { DevCategoryListComponent } from './dev-category/dev-category-list/dev-category-list.component';
// import { DevCategoryEditComponent } from './dev-category/dev-category-edit/dev-category-edit.component';

import {DevCategoryListComponent} from './dev-category-list/dev-category-list.component';
import { DevCategoryEditComponent } from './dev-category-edit/dev-category-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminCdsContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dev-category'
      },
      {
        path: 'dev-category',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: DevCategoryListComponent
          },
          {
            path: 'edit',
            component: DevCategoryEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCdsRoutingModule {}
