import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { ImiStudyReviewService } from '../../imi-study-review.service';

@Component({
  selector: 'app-imi-study-cdms-view',
  templateUrl: './imi-study-cdms-view.component.html',
  styleUrls: ['./imi-study-cdms-view.component.css']
})
export class ImiStudyCdmsViewComponent {
  loading: boolean = false;
  studyId: number = 0;
  record: any;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: ImiStudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType == 'DM+IMI' || st?.studyType == 'IMI') {
        this.studyId = st.studyId;
        this.loadRecord(st.studyId);
      }
      if (st?.studyType == 'DM') {
        // this.router.navigate(['/study/review']);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyCdmsViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  getYesOrNoStatus(flag: boolean) {
    if(flag == true) {
      return "Yes";
    } else {
      return "No";
    }
  }
}
