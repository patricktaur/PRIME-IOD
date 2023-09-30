import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { ImiStudyCdmsTrackerContainerComponent } from './imi-study-cdms-tracker-container/imi-study-cdms-tracker-container.component';
import { ImiStudyCdmsTrackerListComponent } from './imi-study-cdms-tracker-list/imi-study-cdms-tracker-list.component';
import { ImiStudyCdmsTrackerEditComponent } from './imi-study-cdms-tracker-item-group/imi-study-cdms-tracker-edit/imi-study-cdms-tracker-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ImiStudyCdmsTrackerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ImiStudyCdmsTrackerListComponent
      },
      {
        path: 'new',
        component: ImiStudyCdmsTrackerEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/imi-tabs/imi-cdms-group/imi-study-cdms-tracker/imi-study-cdms-tracker-item-group/imi-study-cdms-tracker-item-group.module'
          ).then(m => m.ImiStudyCdmsTrackerItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiStudyCdmsTrackerRoutingModule {}
