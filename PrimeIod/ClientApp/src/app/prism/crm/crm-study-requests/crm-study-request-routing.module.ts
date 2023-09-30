import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmStudyContainterComponent } from './crm-study-containter/crm-study-containter.component';
import { CrmStudyListComponent } from './crm-study-list/crm-study-list.component';
import { CrmStudyEditComponent } from './crm-study-edit/crm-study-edit.component';
import { CrmStudyFilterComponent } from './crm-study-filter/crm-study-filter.component';
import { CrmStudyApprovalListComponent } from './crm-study-approval-list/crm-study-approval-list.component';
import { CrmStudyApprovalEditComponent } from './crm-study-approval-edit/crm-study-approval-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CrmStudyContainterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'crm-study-list'
      },
      {
        path: 'crm-study-list',
        component: CrmStudyListComponent
      },
      {
        path: 'crm-study-edit',
        component: CrmStudyEditComponent
      },
      {
        path: 'crm-study-approval-list',
        component: CrmStudyApprovalListComponent
      },
      {
        path: 'crm-study-approval-edit',
        component: CrmStudyApprovalEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmStudyRequestRoutingModule {}
