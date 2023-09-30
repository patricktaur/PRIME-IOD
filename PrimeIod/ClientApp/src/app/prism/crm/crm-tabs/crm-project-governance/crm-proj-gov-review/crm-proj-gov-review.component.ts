import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { crmProjectGovernanceService } from '../crm-project-governance.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';


@Component({
  selector: 'app-crm-proj-gov-review',
  templateUrl: './crm-proj-gov-review.component.html',
  styleUrls: ['./crm-proj-gov-review.component.css']
})
export class CrmProjGovReviewComponent implements OnInit  {
  // @Input() studyId: number = 0;
  // @Input() groupId: number = 0;

  studyId : number = 0;
  groupId : number = 0;

  selectedReview: number | undefined;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  

  reviews: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private crmProjectGovernanceSer: crmProjectGovernanceService,
    private studyEditService: StudyEditService,

  ) {}

  ngOnInit(): void {


    this.groupId = this.route.snapshot.data['groupId'] || 0;
    
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      const studyType = st?.studyType;
      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        if (this.studyId > 0 && this.groupId > 0){
          this.loadData(this.studyId, this.groupId);
        }
        
      }
    });
  }

  get hasReviews(): boolean { return this.reviews && this.reviews.length > 0; }

  loadData(studyId: number, groupId : number) {
    this.selectedReview = 0;
    this.loadSubscription = this.crmProjectGovernanceSer.getCrmProjGovReviewList(studyId, groupId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          
        } else {
          this.reviews = res;
          if (this.reviews.length > 0){
            this.selectedReview = this.reviews[0].recId;
          }
          
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  onFiltersChange() {
    // this.filterChange.emit(this.selectedFilters);
  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
    this.studyIdSubscription?.unsubscribe();
  }
 
}
