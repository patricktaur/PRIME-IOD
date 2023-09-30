import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudyTypeGuard} from '@app/prism/shared-comps/guards/study-type.guard'
import { StudyGroupContainerComponent } from './study-group-container/study-group-container.component';

const routes: Routes = [
  {
    path: '',
    component: StudyGroupContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dm'
      },
      {
        path: 'dm',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@app/prism/study/study-group/study-dm/study-dm.module').then(m => m.StudyDmModule),
            outlet: 'primary',
            canActivate: [ StudyTypeGuard ]
          },
          // { path: '', component: StudyDmDashboardComponent, outlet: 'dashboard' }
        ],
    
        
      },

      {
        path: 'dm-imi',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@app/prism/study/study-group/study-dm-imi/study-dm-imi.module').then(m => m.StudyDmImiModule),
            outlet: 'primary'
          }
          // { path: '', component: StudyDmDashboardComponent, outlet: 'dashboard' }
        ]
      },

      {
        path: 'imi',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@app/prism/study/study-group/study-imi/study-imi.module').then(m => m.StudyImiModule),
            outlet: 'primary'
          }
          // { path: '', component: StudyImiDashboardComponent, outlet: 'dashboard' }
        ]
      },

      {
        path: 'crm',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@app/prism/study/study-group/study-crm/study-crm.module').then(m => m.StudyCrmModule),
            outlet: 'primary'
          }
          // { path: '', component: StudyCrmDashboardComponent, outlet: 'dashboard' }
        ]
      },
      {
        path: 'dm-crm',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@app/prism/study/study-group/study-dm-crm/study-dm-crm.module').then(m => m.StudyDmCrmModule),
            outlet: 'primary'
          }
          // { path: '', component: StudyCrmDashboardComponent, outlet: 'dashboard' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyGroupRoutingModule {}
