import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-study-startup-view',
  templateUrl: './study-startup-view.component.html',
  styleUrls: ['./study-startup-view.component.css']
})
export class StudyStartupViewComponent {
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
