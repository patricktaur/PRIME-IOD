import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finance-view',
  templateUrl: './finance-view.component.html',
  styleUrls: ['./finance-view.component.css']
})
export class FinanceViewComponent {
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
