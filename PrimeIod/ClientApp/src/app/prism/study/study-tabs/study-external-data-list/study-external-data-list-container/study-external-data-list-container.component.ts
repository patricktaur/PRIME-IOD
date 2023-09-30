import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-external-data-list-container',
  templateUrl: './study-external-data-list-container.component.html',
  styleUrls: ['./study-external-data-list-container.component.css']
})
export class StudyExternalDataListContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
  }
}
