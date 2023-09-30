import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudyDetailsContainerRoutingModule } from './study-details-container-routing.module';
import { StudyDetailsContainerContainerComponent } from './study-details-container-container/study-details-container-container.component';
import { StudyDescriptionComponent } from '@app/prism/study/study-review-tabs/study-details-container/study-description/study-description.component';
import { StudyAssumptionsComponent } from '@app/prism/study/study-review-tabs/study-details-container/study-assumptions/study-assumptions.component';
import { StudyOtherIconDepartmentsComponent } from './study-other-icon-departments/study-other-icon-departments.component';
import { StudyDescriptionViewComponent } from './study-description-view/study-description-view.component';
import { StudyAssumptionsViewComponent } from './study-assumptions-view/study-assumptions-view.component';
import { StudyOtherIconDepartmentsViewComponent } from './study-other-icon-departments-view/study-other-icon-departments-view.component';
import { RouterModule, Routes, ROUTES } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';

@NgModule({
  declarations: [
    StudyDetailsContainerContainerComponent,
    StudyDescriptionComponent,
    StudyAssumptionsComponent,
    StudyOtherIconDepartmentsComponent,
    StudyDescriptionViewComponent,
    StudyAssumptionsViewComponent,
    StudyOtherIconDepartmentsViewComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudyDetailsContainerRoutingModule],
  // providers: [{
  //   provide: ROUTES,
  //   useFactory: configRoutes,
  //   deps: [CredentialsService]
  // }]
})
export class StudyDetailsContainerModule {}

// export function configRoutes(credentialsService: CredentialsService) {
//   let hasAdminRole = credentialsService.userHasRolePermission(UserRoles.Admin);
//   let hasDMManagerRole = credentialsService.userHasRolePermission(UserRoles.CDS_Manager);

//   let currentUserRoleIsAdminOrDMManager = hasAdminRole || hasDMManagerRole ? true : false;

//   let routes: Routes = []
//   if(currentUserRoleIsAdminOrDMManager) {
//     routes = [
//       {
//         path: '',
//         component: StudyDetailsContainerContainerComponent,
//         children: [
//           {
//             path: '',
//             pathMatch: 'full',
//             redirectTo: 'description'
//           },
//           {
//             path: 'description',
//             component: StudyDescriptionComponent,
//             canDeactivate: [CanDeactivateGuard]
//           },
//           {
//             path: 'other-icon-departments',
//             component: StudyOtherIconDepartmentsComponent,
//             canDeactivate: [CanDeactivateGuard]
//           },
//           {
//             path: 'assumptions',
//             component: StudyAssumptionsComponent,
//             canDeactivate: [CanDeactivateGuard]
//           },
//         ]
//       }
//     ]
//   } else {
//     routes = [
//       {
//         path: '',
//         component: StudyDetailsContainerContainerComponent,
//         children: [
//           {
//             path: 'description',
//             component: StudyDescriptionViewComponent,
//             canDeactivate: [CanDeactivateGuard]
//           },
//           {
//             path: 'other-icon-departments',
//             component: StudyOtherIconDepartmentsComponent,
//             canDeactivate: [CanDeactivateGuard]
//           },
//           {
//             path: 'assumptions',
//             component: StudyAssumptionsViewComponent,
//             canDeactivate: [CanDeactivateGuard]
//           }
//         ]
//       }
//     ]
//   }
// }
