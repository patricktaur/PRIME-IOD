import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-crm-budget-container',
  templateUrl: './crm-budget-container.component.html',
  styleUrls: ['./crm-budget-container.component.css']
})
export class CrmBudgetContainerComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');
  }
}
