import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CrmStudyResourcesContainerComponent } from './crm-study-resources-container/crm-study-resources-container.component';
import { CrmStudyResourcesListComponent } from './crm-study-resources-list/crm-study-resources-list.component';
import { CrmStudyResourcesEditComponent } from './crm-study-resources-edit/crm-study-resources-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CrmStudyResourcesContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CrmStudyResourcesListComponent
      },
      {
        path: 'edit',
        component: CrmStudyResourcesEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmStudyResourcesRoutingModule {}
