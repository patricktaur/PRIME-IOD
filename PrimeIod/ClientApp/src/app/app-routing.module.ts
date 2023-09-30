import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import { StudyMembersComponent } from '@app/prism/prism-home/study-members/study-members.component';
import {SplashComponent} from './common/splash/splash.component'
import { StudyIconNumbersResolver } from './prism/resolvers/study-icon-number-resolver';

const routes: Routes = [
  //To ensure that all menu permissions are loaded before navigating to default page:
  // { path: '', redirectTo: '/prism-home', pathMatch: 'full' },
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  
  
  Shell.childRoutes([
    { path: 'app-admin', loadChildren: () => import('@app/app-admin/app-admin.module').then(m => m.AppAdminModule) }
  ]),
  Shell.childRoutes([
    { path: 'masters', loadChildren: () => import('@app/prism/masters/masters.module').then(m => m.MastersModule) }
  ]),
  Shell.childRoutes([
    {
      path: 'prism-home',
      loadChildren: () => import('@app/prism/prism-home/prism-home.module').then(m => m.PrismHomeModule)
    }
  ]),
  Shell.childRoutes([
    {
      path: 'studyXX',
      loadChildren: () => import('@app/prism/study/study.module').then(m => m.StudyModule)
    }
  ]),
  Shell.childRoutes([
    {
      path: 'study',
      loadChildren: () => import('@app/prism/study/study-group/study-group.module').then(m => m.StudyGroupModule),
      resolve: {
        studyIconNumbers: StudyIconNumbersResolver
      }
    }
  ]),
  Shell.childRoutes([
    {
      path: 'cds-trackers',
      loadChildren: () => import('@app/prism/cds-trackers/cds-trackers.module').then(m => m.CdsTrackersModule)
    }
  ]),
  Shell.childRoutes([
    {
      path: 'imi-ra-trackers',
      loadChildren: () =>
        import('@app/prism/imi-ra-trackers/imi-ra-trackers.module').then(m => m.ImiRaTrackersGroupModule)
    }
  ]),
  Shell.childRoutes([
    {
      path: 'process-improvement-trackers',
      loadChildren: () =>
        import('@app/prism/process-improvement-trackers/process-improvement-trackers.module').then(
          m => m.ProcessImprovmentTrackersModule
        )
    }
  ]),
  Shell.childRoutes([
    {
      path: 'crm-trackers',
      loadChildren: () => import('@app/prism/crm/crm-group/crm-group.module').then(m => m.CrmGroupModule)
    }
  ]),

  Shell.childRoutes([
    { path: 'reports', loadChildren: () => import('@app/prism/reports/reports.module').then(m => m.ReportsModule) }
  ]),

  Shell.childRoutes([
    { path: 'requests', loadChildren: () => import('@app/prism/requests/requests.module').then(m => m.RequestsModule) }
  ]),

  Shell.childRoutes([
    { path: 'admin', loadChildren: () => import('@app/prism/admin/admin.module').then(m => m.AdminModule) }
  ]),

  Shell.childRoutes([
    { path: 'users', loadChildren: () => import('@app/prism/admin/users/users.module').then(m => m.UsersModule) }
  ]),

  Shell.childRoutes([{ path: 'user', loadChildren: () => import('@app/user/user.module').then(m => m.UserModule) }]),
  
  Shell.childRoutes([{ path: 'study-team-members', component: StudyMembersComponent }]),
  Shell.childRoutes([{ path: 'no-access', component: NoaccessComponent }]),
  Shell.childRoutes([{ path: 'error-page', component: ErrorPageComponent }]),

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules
      // ,     enableTracing: true // <-- debugging purposes only
    })
  ],
  //{ enableTracing: true }
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class AppRoutingModule {}
