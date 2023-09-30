import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CrmTrackerFourContainerComponent } from './crm-tracker-four-container/crm-tracker-four-container.component';
import { CrmTrackerFourListComponent } from './crm-tracker-four-list/crm-tracker-four-list.component';
import { CrmTrackerFourEditComponent } from './crm-tracker-four-edit/crm-tracker-four-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CrmTrackerFourContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CrmTrackerFourListComponent
      },
      {
        path: 'edit',
        component: CrmTrackerFourEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmTrackerFourRoutingModule {}
