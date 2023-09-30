import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CrmTrackerThreeContainerComponent } from './crm-tracker-three-container/crm-tracker-three-container.component';
import { CrmTrackerThreeListComponent } from './crm-tracker-three-list/crm-tracker-three-list.component';
import { CrmTrackerThreeEditComponent } from './crm-tracker-three-edit/crm-tracker-three-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CrmTrackerThreeContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CrmTrackerThreeListComponent
      },
      {
        path: 'edit',
        component: CrmTrackerThreeEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmTrackerThreeRoutingModule {}
