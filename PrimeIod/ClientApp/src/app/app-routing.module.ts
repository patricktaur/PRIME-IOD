import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from '@app/core/services/can-deactivate-guard.service';
import {SplashComponent} from './common/splash/splash.component'

const routes: Routes = [
  //To ensure that all menu permissions are loaded before navigating to default page:
 
  // { path: '', redirectTo: '/splash', pathMatch: 'full' },
  // { path: 'splash', component: SplashComponent },
  
  { path: '', redirectTo: '/fte', pathMatch: 'full' },
  
  
  
  // Shell.childRoutes([
  //   {
  //     path: 'fte',
  //     loadChildren: () => import('@app/prism/fte/fte-group/fte-group.module').then(m => m.FteGroupModule),
  //   }
  // ]),


  

  
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
