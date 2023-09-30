import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-quality-review-container',
  templateUrl: './study-quality-review-container.component.html',
  styleUrls: ['./study-quality-review-container.component.css']
})
export class StudyQualityReviewContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
  }
}
