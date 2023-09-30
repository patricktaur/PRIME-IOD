import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import {UserInfoUserIdService} from '../user-info-user-id.service'
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [UserInfoUserIdService]
})
export class UserInfoComponent implements OnInit {
  userId : any;
  
  permissions: any;
  permissionValues: any;
  compPermissions: any;
  menuPermissions: any;
  constructor(
    private location: Location,
    private credentialsService: CredentialsService,
    private userInfoUserIdService : UserInfoUserIdService
    ) {}

  ngOnInit(): void {
    this.permissionValues = this.credentialsService.userPermissionValues;
    this.permissions = this.credentialsService.userPermissions;
    this.compPermissions = this.credentialsService.compPermissions;
    this.menuPermissions = this.credentialsService.menuPermissions;
    this.userId = this.credentialsService.currentUser.id;
    const userIdNumber: number = +this.userId ;
    this.userInfoUserIdService.updateUserId(userIdNumber);
  }

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
}
