import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyCDSDeliveryTaskContainerComponent } from './study-cds-delivery-task-container/study-cds-delivery-task-container.component';
import { StudyCDSDeliveryTaskListComponent } from './study-cds-delivery-task-list/study-cds-delivery-task-list.component';
import { StudyCDSDeliveryTaskEditComponent } from './study-cds-delivery-task-item-group/study-cds-delivery-task-edit/study-cds-delivery-task-edit.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';

const routes: Routes = [
  {
    path: '',
    component: StudyCDSDeliveryTaskContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: StudyCDSDeliveryTaskListComponent
      },
      {
        path: 'new',
        component: StudyCDSDeliveryTaskEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        // canActivate: [ StudyEditGuard ],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'view' }
      },
      {
        path: 'item-group', //for edit-view-history
        loadChildren: () =>
          import(
            '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-task-item-group/study-cds-delivery-task-item-group.module'
          ).then(m => m.StudyCdsDeliveryTaskItemGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCDSDeliveryTaskRoutingModule {}
