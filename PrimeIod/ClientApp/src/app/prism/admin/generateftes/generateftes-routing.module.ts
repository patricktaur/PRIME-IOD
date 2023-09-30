import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateftesContainerComponent } from './generateftes-container/generateftes-container.component';
const routes: Routes = [
  {
    path: '',
    component: GenerateftesContainerComponent
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'users-list'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateFTEsRoutingModule {}
