import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {SplashComponent} from './common/splash/splash.component'
import {NotReadyComponent} from '@app/common/not-ready/not-ready.component'
const routes: Routes = [
  //To ensure that all menu permissions are loaded before navigating to default page:
 
  // { path: '', redirectTo: '/splash', pathMatch: 'full' },
  // { path: 'splash', component: SplashComponent },
  
  { path: '', redirectTo: 'fte-demand', pathMatch: 'full' },
  

  // Shell.childRoutes([{ path: 'studies', component: NotReadyComponent }]),

  Shell.childRoutes([{ path: 'studies', 
  loadChildren: () => import('@app/prime-iod/study/study.module').then(m => m.StudyModule),
 }]),

  
  Shell.childRoutes([{ path: 'study-details', component: NotReadyComponent }]),
  
  Shell.childRoutes([
    {
      path: 'fte-demand',
      loadChildren: () => import('@app/prime-iod/fte/fte-demand/fte-demand.module').then(m => m.FteDemandModule),
    }
  ]),
  Shell.childRoutes([{ path: 'fte-assignment', component: NotReadyComponent }]),
  Shell.childRoutes([{ path: 'fte-milestones', component: NotReadyComponent }]),
 
  Shell.childRoutes([{ path: 'resources-search', component: NotReadyComponent }]),
  Shell.childRoutes([{ path: 'resources-assignment', component: NotReadyComponent }]),
 
  Shell.childRoutes([{ path: 'uploads-study', component: NotReadyComponent }]),
  Shell.childRoutes([{ path: 'uploads-employee', component: NotReadyComponent }]),
  Shell.childRoutes([{ path: 'uploads-timesheet', component: NotReadyComponent }]),
  Shell.childRoutes([{ path: 'uploads-demand', component: NotReadyComponent }]),
  Shell.childRoutes([{ path: 'uploads-assignment', component: NotReadyComponent }]),


  
  Shell.childRoutes([{ path: 'no-access', component: NoaccessComponent }]),
  Shell.childRoutes([{ path: 'error-page', component: ErrorPageComponent }]),

  // { path: '**', redirectTo: '', pathMatch: 'full' }
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
