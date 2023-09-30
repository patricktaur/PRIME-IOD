import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyEditGuard } from '@app/core/services/study-edit-guard.service';
import {PermissionGuard} from '@app/core/authentication/permission.guard'
import { StudyResourcesGroupContainerComponent } from './study-resources-group-container/study-resources-group-container.component';
const routes: Routes = [
  {
    path: '',
    component: StudyResourcesGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'study-resources'
      },
      {
        path: 'study-resources',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.module').then(
            m => m.StudyResourcesModule
          ),
          canActivate: [PermissionGuard],
          // data: {
          //   parentPath: 'study/dm/resources-group',
          // }
      },
      {
        path: 'study-resources-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.module').then(
            m => m.StudyResourcesModule
          ),
        data: {
          mode: 'view'
        }
      },

      {
        path: 'fte-resources',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-resources-group/study-fte-review/study-fte-review.module').then(
            m => m.StudyFteReviewModule
          ),
        
      },

      {
        path: 'fte-resources-view',
        loadChildren: () =>
          import('@app/prism/study/study-tabs/study-resources-group/study-fte-review/study-fte-review.module').then(
            m => m.StudyFteReviewModule
          ),
          
        data: {
          mode: 'view'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyResourcesGroupRoutingModule {}
