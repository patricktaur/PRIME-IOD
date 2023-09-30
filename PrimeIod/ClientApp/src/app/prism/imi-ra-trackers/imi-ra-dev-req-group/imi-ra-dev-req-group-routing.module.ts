import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiRaDevReqGroupContainerComponent } from './imi-ra-dev-req-group-container/imi-ra-dev-req-group-container.component';
import { ImiRaDevReqListComponent } from './imi-ra-dev-req-list/imi-ra-dev-req-list.component';
import { ImiRaDevpReqEditComponent } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-devp-req-item-group/imi-ra-devp-req-edit/imi-ra-devp-req-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ImiRaDevReqGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ImiRaDevReqListComponent
      },
      {
        path: 'new',
        component: ImiRaDevpReqEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-devp-req-item-group/imi-ra-devp-req-item-group.module'
          ).then(m => m.ImiRaDevpReqItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiRaDevReqGroupRoutingModule {}
