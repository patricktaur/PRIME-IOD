import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { UserRoutingModule } from '@app/user/user-routing.module';
import { UserInfoComponent } from '@app/user/user-info/user-info.component';
import {AppAccessUserIdService} from '@app/prism/admin/app-access/app-access-user-id.service'
import {UserInfoUserIdService} from './user-info-user-id.service';
import { UserAccessViewComponent } from './user-access-view/user-access-view.component'
import {AppAccessModule} from '@app/prism/admin/app-access/app-access.module';
import { UserLoginDetailsComponent } from './user-login-details/user-login-details.component';
import { UserLoginDetailsFilterComponent } from './user-login-details/user-login-details-filter/user-login-details-filter.component'

@NgModule({
  declarations: [UserInfoComponent, UserAccessViewComponent, UserLoginDetailsComponent, UserLoginDetailsFilterComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule, AppAccessModule],
  entryComponents: [],
  providers:[
    { provide: AppAccessUserIdService, useClass: UserInfoUserIdService }
  ]
})
export class UserModule {}
