import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadContainerComponent } from './upload-container/upload-container.component';
// import { FteListComponent } from './fte/fte-list/fte-list.component';
// import { FteResourceListComponent } from './fte-resource/fte-resource-list/fte-resource-list.component';
// import { ImiTimelinesListComponent } from './imi-timelines/imi-timelines-list/imi-timelines-list.component';
// import { PageListComponent } from './page/page-list/page-list.component';
const routes: Routes = [
  {
    path: '',
    component: UploadContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'fte-list'
      },
      
      // {
      //   path: 'imi-timelines-list',
      //   component: ImiTimelinesListComponent
      // },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
