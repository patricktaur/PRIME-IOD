import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-crm-project-governance-container',
  templateUrl: './crm-project-governance-container.component.html',
  styleUrls: ['./crm-project-governance-container.component.css']
})
export class CrmProjectGovernanceContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');
  }
}
