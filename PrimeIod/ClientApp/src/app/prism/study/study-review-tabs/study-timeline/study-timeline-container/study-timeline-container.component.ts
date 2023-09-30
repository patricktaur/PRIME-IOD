import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-timeline-container',
  templateUrl: './study-timeline-container.component.html',
  styleUrls: ['./study-timeline-container.component.css']
})
export class StudyTimelineContainerComponent implements OnInit {
  rootPath = 'study/dm/timeline-group';
  subscription: Subscription | undefined;
  subscription1: Subscription | undefined;
  studyId: any;
  studyProperties: any;
  hasDMManagerRole: boolean = false;
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
    });
    this.subscription1 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });

    this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
