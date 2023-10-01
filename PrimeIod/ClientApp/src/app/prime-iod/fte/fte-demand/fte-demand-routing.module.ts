import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { FteDemandContainerComponent } from './fte-demand-container/fte-demand-container.component';
import { FteDemandListComponent } from './fte-demand-list/fte-demand-list.component';
import { FteDemandEditComponent } from './fte-demand-edit/fte-demand-edit.component';
const routes: Routes = [
  {
    path: '',
    component: FteDemandContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: FteDemandListComponent
      },
      {
        path: 'edit',
        component: FteDemandEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FteDemandRoutingModule {}
