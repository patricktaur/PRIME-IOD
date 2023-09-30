import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CrmProjGovAnalysisContainerComponent } from './crm-proj-gov-analysis-container/crm-proj-gov-analysis-container.component';
import {CrmProjGovEditComponent} from '../crm-proj-gov-edit/crm-proj-gov-edit.component';
import {CrmProjGovReviewComponent} from '../crm-proj-gov-review/crm-proj-gov-review.component';

const routes: Routes = [
  {
    path: '',
    component: CrmProjGovAnalysisContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit'
      },
     
      {
        path: 'edit',
        component: CrmProjGovEditComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { groupId: 3 }
      },
      {
        path: 'reviews',
        component: CrmProjGovReviewComponent,
        data: { groupId: 3 }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmProjGovAnalysisRoutingModule {}
