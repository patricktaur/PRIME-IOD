import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
// import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';

import { StudyDetailsContainerContainerComponent } from './study-details-container-container/study-details-container-container.component';
import { StudyDescriptionComponent } from '@app/prism/study/study-review-tabs/study-details-container/study-description/study-description.component';
import { StudyOtherIconDepartmentsComponent } from '@app/prism/study/study-review-tabs/study-details-container/study-other-icon-departments/study-other-icon-departments.component';
import { StudyAssumptionsComponent } from '@app/prism/study/study-review-tabs/study-details-container/study-assumptions/study-assumptions.component';
import { StudyDescriptionViewComponent } from './study-description-view/study-description-view.component';
import { StudyOtherIconDepartmentsViewComponent } from './study-other-icon-departments-view/study-other-icon-departments-view.component';
import { StudyAssumptionsViewComponent } from './study-assumptions-view/study-assumptions-view.component';
import { UserRoles } from '@app/core/authentication/credentials.enums';
const routes: Routes = [
  {
    path: '',
    component: StudyDetailsContainerContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'description'
      },
      {
        path: 'description',
        component: StudyDescriptionComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
         
      },
      {
        path: 'other-icon-departments',
        component: StudyOtherIconDepartmentsComponent,
        canDeactivate: [CanDeactivateGuard],
        
      },
      {
        path: 'assumptions',
        component: StudyAssumptionsComponent,
        canDeactivate: [CanDeactivateGuard],
        
      },
      {
        path: 'description-view',
        component: StudyDescriptionViewComponent
      },
      {
        path: 'other-icon-departments-view',
        component: StudyOtherIconDepartmentsViewComponent
      },
      {
        path: 'assumptions-view',
        component: StudyAssumptionsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyDetailsContainerRoutingModule {}
