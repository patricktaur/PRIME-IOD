import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-cdms-group-container',
  templateUrl: './study-cdms-group-container.component.html',
  styleUrls: ['./study-cdms-group-container.component.css']
})
export class StudyCdmsGroupContainerComponent implements OnInit {
  studyId: number = 0;
  subscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  clininfoTab:boolean=false;

  hasDMManagerRole: boolean = false;
  
  constructor(private studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
    });

    this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
        // console.log(`st = ${JSON.stringify(st, null, 2)}`);
        if(((st.cdms).trim()).toLowerCase()=="clininfo"){
          this.clininfoTab=true;
        }else{
          this.clininfoTab=false;
        }
    });
  }
}
