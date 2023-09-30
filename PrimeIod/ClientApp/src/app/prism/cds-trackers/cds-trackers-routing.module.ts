import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CdsTrackersContainerComponent } from './cds-trackers-container/cds-trackers-container.component';
import { NotReadyComponent } from '@app/common/not-ready/not-ready.component';
const routes: Routes = [
  {
    path: '',
    component: CdsTrackersContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'development-request'
      },

      {
        path: 'development-request', //for edit-view-history
        // component: NotReadyComponent
        loadChildren: () =>
          import('@app/prism/cds-trackers/cds-dev-task-req-group/cds-dev-task-req-group.module').then(
            m => m.CdsDevTaskReqGroupModule
          )
      },
      //hidden - based on UAT Request Sep 2022
      // {
      //   path: 'validation-request', //for edit-view-history
      //   // component: NotReadyComponent
      //   loadChildren: () =>
      //     import('@app/prism/cds-trackers/cds-val-task-req-group/cds-val-task-req-group.module').then(
      //       m => m.CdsValTaskReqGroupModule
      //     )
      // },
      {
        path: 'output-request',
        // component: NotReadyComponent
        loadChildren: () =>
          import('@app/prism/cds-trackers/cds-output-task-req-group/cds-output-task-req-group.module').then(
            m => m.CDSOutputTaskGroupModule
          )
      },
      {
        path: 'delivery-request',
        // component: NotReadyComponent
        loadChildren: () =>
          import('@app/prism/cds-trackers/cds-del-task-req-group/cds-del-task-req-group.module').then(
            m => m.CdsDelTaskReqGroupModule
          )
      },
      {
        path: 'coding-request',
        // component: NotReadyComponent
        loadChildren: () =>
          import('@app/prism/cds-trackers/cds-coding-task-req-group/cds-coding-task-req-group.module').then(
            m => m.CdsCodingTaskReqGroupModule
          )
      },
      {
        path: 'instruction-request',
        // component: NotReadyComponent
        loadChildren: () =>
          import('@app/prism/cds-trackers/cds-inst-task-req-group/cds-inst-task-req-group.module').then(
            m => m.CdsInstTaskReqGroupModule
          )
      },
      { 
        path: 'archived-data',
        loadChildren: () => 
          import('@app/prism/cds-trackers/archived-data/archived-data.module').then(
            m => m.ArchivedDataModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdsTrackersRoutingModule {}
