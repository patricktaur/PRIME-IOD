import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-review-container',
  templateUrl: './imi-review-container.component.html',
  styleUrls: ['./imi-review-container.component.css']
})
export class ImiReviewGroupContainerComponent implements OnInit {
  rootPath = "study/imi/review-group";
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('imi');
  }
}
