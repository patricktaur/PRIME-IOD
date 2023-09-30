import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
@Component({
  selector: 'app-study-cds-group-container',
  templateUrl: './study-cds-group-container.component.html',
  styleUrls: ['./study-cds-group-container.component.css']
})
export class StudyCdsGroupContainerComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  studyProperties: any;
  sub: Subscription | undefined;


  hasDMManagerRole: boolean = false;
  constructor(private studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.sub = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
      this.studyId = st.id;

      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
