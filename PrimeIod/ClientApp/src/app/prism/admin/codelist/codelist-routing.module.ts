import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { CodelistContainerComponent } from './codelist-container/codelist-container.component';
import { CodelistListComponent } from './codelist-list/codelist-list.component';
import { CodelistEditComponent } from './codelist-edit/codelist-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CodelistContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CodelistListComponent
      },
      {
        path: 'edit',
        component: CodelistEditComponent
        // canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodelistRoutingModule {}
