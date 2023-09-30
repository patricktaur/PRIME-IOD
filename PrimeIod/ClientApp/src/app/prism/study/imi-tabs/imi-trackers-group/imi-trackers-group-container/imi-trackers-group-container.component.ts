import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-trackers-group-container',
  templateUrl: './imi-trackers-group-container.component.html',
  styleUrls: ['./imi-trackers-group-container.component.css']
})
export class ImiTrackersGroupContainerComponent implements OnInit {
  rootPath = "study/imi/trackers-group";
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('imi');
  }
}
