import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ThirdPartyTrackerContainerComponent } from './third-party-tracker-container/third-party-tracker-container.component';
import { ThirdPartyTrackerListComponent } from './third-party-tracker-list/third-party-tracker-list.component';
import { ThirdPartyTrackerEditComponent } from './third-party-tracker-item-group/third-party-tracker-edit/third-party-tracker-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ThirdPartyTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ThirdPartyTrackerListComponent
      },
      {
        path: 'new',
        component: ThirdPartyTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cdms-group/third-party-tracker/third-party-tracker-item-group/third-party-tracker-item-group.module'
          ).then(m => m.ThirdPartyTrackerItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyTrackerRoutingModule {}
