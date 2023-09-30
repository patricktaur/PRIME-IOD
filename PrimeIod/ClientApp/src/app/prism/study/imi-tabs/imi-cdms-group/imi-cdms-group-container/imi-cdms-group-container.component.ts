import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-cdms-group-container',
  templateUrl: './imi-cdms-group-container.component.html',
  styleUrls: ['./imi-cdms-group-container.component.css']
})
export class ImiCdmsGroupContainerComponent implements OnInit {
  rootPath = "study/imi/cdms-group";

  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('imi');
  }
}
