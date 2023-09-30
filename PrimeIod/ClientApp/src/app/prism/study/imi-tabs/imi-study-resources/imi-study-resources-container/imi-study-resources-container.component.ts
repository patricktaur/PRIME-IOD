import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-study-resources-container',
  templateUrl: './imi-study-resources-container.component.html',
  styleUrls: ['./imi-study-resources-container.component.css']
})
export class ImiStudyResourcesContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('imi');
  }
}
