import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-review-container',
  templateUrl: './study-review-container.component.html',
  styleUrls: ['./study-review-container.component.css']
})
export class StudyReviewContainerComponent implements OnInit {
  rootPath = "study/dm/review";
  subscription: Subscription | undefined;
  subscription1: Subscription | undefined;
  studyId: any;
  studyProperties: any;

  hasDMManagerRole: boolean = false;

  constructor(private studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    });
    this.subscription1 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
