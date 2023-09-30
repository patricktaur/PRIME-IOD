import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-risk-management-view',
  templateUrl: './risk-management-view.component.html',
  styleUrls: ['./risk-management-view.component.css']
})
export class RiskManagementViewComponent {
  @Input() record: any = {};
  constructor() {}

  ngOnInit(): void {
  }

  getStyle(score: any) {
    return '';
  }

  getNotApplicableStatus(flag: boolean) {
    if(flag == true) {
      return "Yes";
    } else {
      return "No";
    }
  }
}
