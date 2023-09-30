import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AppCompMenuPermissionsService } from '@app/core/authentication/app-comp-menu-permissions.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-component-access',
  templateUrl: './component-access.component.html',
  styleUrls: ['./component-access.component.css']
})
export class ComponentAccessComponent implements OnInit {
  @Input() compCode: string = "";
  @Input('redirect-to') redirectTo: string = '/no-access';
  @Input('show-user-permissions') showUserPermissions: boolean = false;
  hasPermission: boolean = false;
  permissions: any;
  constructor(
    private credentialsService: CredentialsService,
    private appCompMenuPermissionsService: AppCompMenuPermissionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const access = this.checkAccessPermission(this.compCode);
    // const permission$ = this.appCompMenuPermissionsService.getCompPermissionByCompCode(this.compCode);
    // console.log("XXX:" + JSON.stringify(permission$));
    let permission = this.credentialsService.getCompPermission(this.compCode);
    if (permission) {
      this.hasPermission = true;
    } else {
      this.router.navigate([this.redirectTo], { relativeTo: this.route.parent });
    }
  }

  //For debugging:
  // userPermissions() {
  //   this.appCompMenuPermissionsService.getAppPermissions().subscribe(permissions => {
  //     return permissions;
  //   });
  // }
}
