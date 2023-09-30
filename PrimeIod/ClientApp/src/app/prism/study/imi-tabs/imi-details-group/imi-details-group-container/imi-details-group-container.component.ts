import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-details-group-container',
  templateUrl: './imi-details-group-container.component.html',
  styleUrls: ['./imi-details-group-container.component.css']
})
export class ImiDetailsGroupContainerComponent implements OnInit {
  rootPath = "study/imi/description-assumptions";

  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('imi');
  }
}
