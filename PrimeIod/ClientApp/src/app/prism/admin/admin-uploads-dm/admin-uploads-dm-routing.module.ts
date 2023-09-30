import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUploadsDmContainerComponent } from './admin-uploads-dm-container/admin-uploads-dm-container.component';

// import { FteListComponent } from './fte/fte-list/fte-list.component';
import { FteListComponent } from './fte/fte-list/fte-list.component';


// import { FteResourceListComponent } from './fte-resource/fte-resource-list/fte-resource-list.component';
import { FteResourceListComponent } from './fte-resource/fte-resource-list/fte-resource-list.component';

import { PageListComponent } from './page/page-list/page-list.component';
// import { PageListComponent } from './page/page-list/page-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUploadsDmContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'fte-list'
      },
      {
        path: 'fte-list',
        component: FteListComponent
      },
      {
        path: 'fte-resource-list',
        component: FteResourceListComponent
      },
     
      {
        path: 'page-list',
        component: PageListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUploadsDmRoutingModule {}
