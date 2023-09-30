import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  constructor(
    private location: Location
    // private router: Router,
    // private route: ActivatedRoute,
    // private actRoute: ActivatedRoute,
    // private i18nService: I18nService,
    // private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

  // login() {
    

  //   if (environment.loginMode == 'win') {
  
  //     this.authenticationService.winLogin().subscribe(
  //       res => {
  //         this.router.navigate(['/']);
  //         // this.router.navigate(['prism-home']);
  //       },
  //       err => {
  //         let errorMsg = err.error.errorDescription; //err.error.error_description;
  //         this.router.navigate(['/not-registered', { error: errorMsg }]);

  //         // return false;
  //       }
  //     );
  //   }
  // }
}
