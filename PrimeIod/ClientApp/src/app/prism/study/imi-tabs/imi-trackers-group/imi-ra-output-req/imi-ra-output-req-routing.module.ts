import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiRaOuputReqListComponent } from './imi-ra-ouput-req-list/imi-ra-ouput-req-list.component';
import { ImiRaOutputReqEditComponent } from './imi-ra-output-item-group/imi-ra-output-req-edit/imi-ra-output-req-edit.component';
import { ImiRaOutputReqContainerComponent } from './imi-ra-output-req-container/imi-ra-output-req-container.component';
const routes: Routes = [
  {
    path: '',
    component: ImiRaOutputReqContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },

      {
        path: 'list',
        component: ImiRaOuputReqListComponent
      },
      {
        path: 'new',
        component: ImiRaOutputReqEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-output-req/imi-ra-output-item-group/imi-ra-output-item-group.module'
          ).then(m => m.ImiRaOutputReqItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiRaOutputReqRoutingModule {}
