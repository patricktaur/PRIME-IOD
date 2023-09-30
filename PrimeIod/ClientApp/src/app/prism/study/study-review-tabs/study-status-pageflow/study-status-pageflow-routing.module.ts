import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
// import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { StudyStatusPageFlowContainerComponent } from './study-status-pageflow-container/study-status-pageflow-container.component';
import { StudyStatusComponent } from '@app/prism/study/study-review-tabs/study-status-pageflow/study-status/study-status.component';
import { StudyPageFlowComponent } from '@app/prism/study/study-review-tabs/study-status-pageflow/study-page-flow/study-page-flow.component';
import { StudyStatusAltComponent } from '@app/prism/study/study-review-tabs/study-status-pageflow/study-status-alt/study-status-alt.component';
import { StudyStatusViewComponent } from './study-status-view/study-status-view.component';
import { StudyPageFlowViewComponent } from './study-page-flow-view/study-page-flow-view.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyStatusAltViewComponent } from './study-status-alt-view/study-status-alt-view.component';

const routes: Routes = [
  {
    path: '',
    component: StudyStatusPageFlowContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'status'
      },
      {
        path: 'status',
        component: StudyStatusComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        
      },
      {
        path: 'status-view',
        component: StudyStatusViewComponent
      },
      {
        path: 'status-alt',
        component: StudyStatusAltComponent,
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [StudyEditGuard],
        // data: { userRole: UserRoles.DMPM_Manager, redirectUrl: 'status-alt-view' }
      },
      {
        path: 'status-alt-view',
        component: StudyStatusAltViewComponent
      },
      {
        path: 'pageflow',
        component: StudyPageFlowComponent,
        canDeactivate: [CanDeactivateGuard],
        
      },
      {
        path: 'pageflow-view',
        component: StudyPageFlowViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyStatusPageFlowRoutingModule {}
