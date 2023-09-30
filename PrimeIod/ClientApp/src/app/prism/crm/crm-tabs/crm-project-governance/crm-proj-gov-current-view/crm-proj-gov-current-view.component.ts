import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { crmProjectGovernanceService } from '../crm-project-governance.service';


@Component({
  selector: 'app-crm-proj-gov-current-view',
  templateUrl: './crm-proj-gov-current-view.component.html',
  styleUrls: ['./crm-proj-gov-current-view.component.css']
})
export class CrmProjGovCurrentViewComponent {
  studyId : number = 0;
  groupId : number = 0;

  currentReviewId: number | undefined;

  studyIdSubscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;
  constructor(
    public route: ActivatedRoute,
    private studyEditService: StudyEditService,
    private crmProjectGovernanceSer: crmProjectGovernanceService,

    

  ) {}

  ngOnInit(): void {

    this.groupId = this.route.snapshot.data['groupId'] || 0;
    
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      const studyType = st?.studyType;
      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        if (this.studyId > 0 && this.groupId > 0){
          this.loadCurrentReviewId(this.studyId, this.groupId);
        }
        
      }
    });

    
  }
  
  loadCurrentReviewId(studyId: number, groupId : number) {
    this.loadSubscription = this.crmProjectGovernanceSer.getCrmProjGovCurrentReviewId(studyId, groupId).subscribe( (res: any) => {
      this.currentReviewId = res });
  }

}
