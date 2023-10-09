import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, untilDestroyed } from '@app/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loaded : boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,

  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data),
        untilDestroyed(this)
      )
      .subscribe((event: any) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });

      //17Apr2023:
      //issue: default comp is loaded before loading the menu permissions
      //resulting in 'no access to this page ...'
      //ensures that permissions are loaded before navigating to router module
      //router-outlet is hidden by default, hence comp is not loaded
      //in the default route :
      //     { path: '', redirectTo: '/splash', pathMatch: 'full' },
      // { path: 'splash', component: SplashComponent },
      // so that this.router.navigate(["/prism-home"]); is executed below
      if (environment.loginMode == 'win') {
  
        this.authenticationService.winLogin().subscribe(
          res => {
            this.loaded = true; // router-outlet is made visible.
            //  this.router.navigate([]);

             this.router.navigate(["/fte-demand"]);
          },
          err => {
            this.loaded = true;
            let errorMsg = err.error.errorDescription; //err.error.error_description;
            this.router.navigate(['/not-registered', { error: errorMsg }]);
  
            // return false;
          }
        );
      }

      console.log("after ")


  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
