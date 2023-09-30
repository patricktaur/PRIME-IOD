import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-quality-group-container',
  templateUrl: './quality-group-container.component.html',
  styleUrls: ['./quality-group-container.component.css']
})
export class QualityGroupContainerComponent implements OnInit {
  studyId: number = 0
  studyProperties: any;
  subscription1: Subscription | undefined;

  hasDMManagerRole: boolean = false;
  constructor(private studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.subscription1 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
    });

    this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }
}
