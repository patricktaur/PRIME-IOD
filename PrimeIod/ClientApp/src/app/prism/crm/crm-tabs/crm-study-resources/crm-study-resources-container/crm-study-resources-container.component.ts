import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-crm-study-resources-container',
  templateUrl: './crm-study-resources-container.component.html',
  styleUrls: ['./crm-study-resources-container.component.css']
})
export class CrmStudyResourcesContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');
  }
}
