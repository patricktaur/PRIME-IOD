import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-management-of-readers-view',
  templateUrl: './management-of-readers-view.component.html',
  styleUrls: ['./management-of-readers-view.component.css']
})
export class ManagementOfReadersViewComponent {
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
