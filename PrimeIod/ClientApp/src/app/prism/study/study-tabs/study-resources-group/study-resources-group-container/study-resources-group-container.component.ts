import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-resources-group-container',
  templateUrl: './study-resources-group-container.component.html',
  styleUrls: ['./study-resources-group-container.component.css']
})
export class StudyResourcesGroupContainerComponent implements OnInit {
  rootPath = 'study/dm/resources-group'; 
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
}
