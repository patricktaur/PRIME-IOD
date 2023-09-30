import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmProjGovAnalysisViewContainerComponent } from './crm-proj-gov-analysis-view-container/crm-proj-gov-analysis-view-container.component';

import {CrmProjGovCurrentViewComponent} from '../crm-proj-gov-current-view/crm-proj-gov-current-view.component';

import {CrmProjGovReviewComponent} from '../crm-proj-gov-review/crm-proj-gov-review.component';

const routes: Routes = [
  {
    path: '',
    component: CrmProjGovAnalysisViewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
     
      {
        path: 'view',
        component: CrmProjGovCurrentViewComponent,
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
export class CrmProjGovAnalysisViewRoutingModule {}
