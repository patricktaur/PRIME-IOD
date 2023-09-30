import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-details-container-container',
  templateUrl: './study-details-container-container.component.html',
  styleUrls: ['./study-details-container-container.component.css']
})
export class StudyDetailsContainerContainerComponent implements OnInit {
  studyId: number = 0;
  // rootPath = ""
  hasDMManagerRole: boolean = false;

  subscription: Subscription | undefined;
  constructor(
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.subscription = this.studyEditService.getStudyProperties()
    .subscribe((st: any) => {
      this.studyId = st.studyId;
      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
