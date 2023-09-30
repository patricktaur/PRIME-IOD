import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-status-pageflow-container',
  templateUrl: './study-status-pageflow-container.component.html',
  styleUrls: ['./study-status-pageflow-container.component.css']
})
export class StudyStatusPageFlowContainerComponent implements OnInit {
  rootPath = 'study/dm/status-pageflow'
  studyId: number = 0;
  subscription: Subscription | undefined;

  hasDMManagerRole: boolean = false;
  
  constructor(private studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
    });

    this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
