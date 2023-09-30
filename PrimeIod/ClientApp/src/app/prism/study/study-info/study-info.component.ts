import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyService } from '@app/prism/study/study.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-info',
  templateUrl: './study-info.component.html',
  styleUrls: ['./study-info.component.css']
})
export class StudyInfoComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  studyDashboard: any;
  studyEditServiceSub: Subscription | undefined;
  constructor(
    private studyService: StudyService,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyEditServiceSub = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyDashboard = st;
    });
  }

  ngOnDestroy(): void {
    this.studyEditServiceSub?.unsubscribe();
  }
}
