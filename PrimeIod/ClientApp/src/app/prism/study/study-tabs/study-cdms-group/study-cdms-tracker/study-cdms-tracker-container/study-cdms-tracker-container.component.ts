import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-cdms-tracker-container',
  templateUrl: './study-cdms-tracker-container.component.html',
  styleUrls: ['./study-cdms-tracker-container.component.css']
})
export class StudyCdmsTrackerContainerComponent implements OnInit {
  studyId: number = 0
  hasDMManagerRole: boolean = false;
  subscription: Subscription | undefined;
  constructor(private studyEditService: StudyEditService, 
    private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    })
  }
}
