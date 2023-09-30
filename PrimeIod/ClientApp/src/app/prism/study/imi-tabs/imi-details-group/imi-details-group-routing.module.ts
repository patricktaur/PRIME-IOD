import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'

import { Routes, RouterModule } from '@angular/router';
import { ImiDetailsGroupContainerComponent } from './imi-details-group-container/imi-details-group-container.component';
import { ImiStudyDescriptionComponent } from './imi-study-description/imi-study-description.component';
import { ImiStudyAssumptionsComponent } from './imi-study-assumptions/imi-study-assumptions.component';
import { ImiStudyDescriptionViewComponent } from './imi-study-description-view/imi-study-description-view.component';
import { ImiStudyAssumptionsViewComponent } from './imi-study-assumptions-view/imi-study-assumptions-view.component';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
const routes: Routes = [
  {
    path: '',
    component: ImiDetailsGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'description'
      },

      {
        path: 'description',
        component: ImiStudyDescriptionComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PermissionGuard],
        data: {  parentPath: 'study/imi/description-assumptions' },
      },

      {
        path: 'description-view',
        component: ImiStudyDescriptionViewComponent
      },

      {
        path: 'assumptions',
        component: ImiStudyAssumptionsComponent,
        canDeactivate: [CanDeactivateGuard],
        
      },

      {
        path: 'assumptions-view',
        component: ImiStudyAssumptionsViewComponent,
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImiDetailsGroupRoutingModule {}
