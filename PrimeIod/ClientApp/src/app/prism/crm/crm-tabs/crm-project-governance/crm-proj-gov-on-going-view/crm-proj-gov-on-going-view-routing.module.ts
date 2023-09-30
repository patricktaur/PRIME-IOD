import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmProjGovOnGoingViewContainerComponent } from './crm-proj-gov-on-going-view-container/crm-proj-gov-on-going-view-container.component';


import {CrmProjGovCurrentViewComponent} from '../crm-proj-gov-current-view/crm-proj-gov-current-view.component';
import {CrmProjGovReviewComponent} from '../crm-proj-gov-review/crm-proj-gov-review.component';

const routes: Routes = [
  {
    path: '',
    component: CrmProjGovOnGoingViewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
     
      {
        path: 'view',
        component: CrmProjGovCurrentViewComponent,
        data: { groupId: 2 }
      },
      {
        path: 'reviews',
        component: CrmProjGovReviewComponent,
        data: { groupId: 2 }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmProjGovOnGoingViewRoutingModule {}
