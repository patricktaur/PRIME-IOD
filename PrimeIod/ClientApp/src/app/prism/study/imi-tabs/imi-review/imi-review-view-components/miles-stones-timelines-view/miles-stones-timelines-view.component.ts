import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-miles-stones-timelines-view',
  templateUrl: './miles-stones-timelines-view.component.html',
  styleUrls: ['./miles-stones-timelines-view.component.css']
})
export class MilesStonesTimelinesViewComponent {
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
