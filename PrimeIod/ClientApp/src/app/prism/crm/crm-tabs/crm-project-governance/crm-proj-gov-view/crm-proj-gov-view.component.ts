import { Component, OnInit, OnDestroy , Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { crmProjectGovernanceService } from '../crm-project-governance.service';
// import { StudyEditService } from '@app/prism/study/study-edit.service';


@Component({
  selector: 'app-crm-proj-gov-view',
  templateUrl: './crm-proj-gov-view.component.html',
  styleUrls: ['./crm-proj-gov-view.component.css']
})
export class CrmProjGovViewComponent implements OnChanges{

  @Input() reviewId: number = 0;
  

  // reviewId: number = 0;

  // form = new FormGroup({});
  loading: boolean = false;
  

  review: any;
  // StatusParId = 1300;

  loadSubscription: Subscription | undefined;
  // studyIdSubscription: Subscription | undefined;
  // saveSubscription: Subscription | undefined;
  // markAsReviewSubscription: Subscription | undefined;
  // isDirtySub: Subscription | undefined;

  constructor(
    // public router: Router,
    // private studyEditService: StudyEditService,
    private crmProjectGovernanceSer: crmProjectGovernanceService,
    
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
    //   this.studyId = st.studyId;
    //   const studyType = st?.studyType;
    //   if (studyType === 'CRM' || studyType === 'DM+CRM') {
    //     this.loaddata(st.studyId, this.groupId);
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reviewId'] && this.reviewId > 0) {
      this.loadData(this.reviewId);
    }
  }


  loadData(reviewId: number) {
    this.loading = true;
    this.loadSubscription = this.crmProjectGovernanceSer.getCrmProjGovReview(reviewId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          
        } else {
          this.review = res;
          
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  

  

 

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
  }
}
