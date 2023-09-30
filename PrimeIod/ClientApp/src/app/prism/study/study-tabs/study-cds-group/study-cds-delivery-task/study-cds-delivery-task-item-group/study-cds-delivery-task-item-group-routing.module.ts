import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCdsDeliveryTaskItemGroupContainerComponent } from './study-cds-delivery-task-item-group-container/study-cds-del-task-item-group-container.component';
import { StudyCdsDelTaskViewComponent } from './study-cds-del-task-view/study-cds-del-task-view.component';
import { StudyCdsDelTaskHistoryComponent } from './study-cds-del-task-history/study-cds-del-task-history.component';
import { StudyCDSDeliveryTaskEditComponent } from './study-cds-delivery-task-edit/study-cds-delivery-task-edit.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyCdsDeliveryTaskItemGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: StudyCdsDelTaskViewComponent
      },
      {
        path: 'history',
        component: StudyCdsDelTaskHistoryComponent
      },
      {
        path: 'edit',
        component: StudyCDSDeliveryTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: '**',
        component: StudyCdsDelTaskViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCdsDeliveryTaskItemGroupRoutingModule {}
