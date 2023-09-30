import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-gsk-group-container',
  templateUrl: './study-gsk-group-container.component.html',
  styleUrls: ['./study-gsk-group-container.component.css']
})
export class StudyGroupContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
  }
}
