import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { StudySftpUserAccessReviewEditComponent } from './study-sftp-user-access-review-edit/study-sftp-user-access-review-edit.component';
import { StudySftpUserAccessReviewListComponent } from './study-sftp-user-access-review-list/study-sftp-user-access-review-list.component';
import { StudySftpUserAccessReviewContainerComponent } from './study-sftp-user-access-review-container/study-sftp-user-access-review-container.component';
import { StudySFtpUserAccessReviewRoutingModule } from './study-sftp-user-access-review-routing.module';

@NgModule({
  declarations: [ 
    StudySftpUserAccessReviewContainerComponent, 
    StudySftpUserAccessReviewListComponent, 
    StudySftpUserAccessReviewEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, StudySFtpUserAccessReviewRoutingModule]
})
export class StudySFtpUserAccessReviewModule {}
