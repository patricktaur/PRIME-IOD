import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-communication-and-meetings-view',
  templateUrl: './communication-and-meetings-view.component.html',
  styleUrls: ['./communication-and-meetings-view.component.css']
})
export class CommunicationAndMeetingsViewComponent {
  @Input() record: any = {};
  medianValue: number = 0;
  constructor() {}

  ngOnInit(): void {
    const nums: number[] = [];
    if (nums != null) {
      nums.sort();
      if (nums.length % 2 != 0) {
        this.medianValue = nums[(nums.length - 1) / 2];
      } else {
        var temp1: number = nums[nums.length / 2];
        let temp2: number = nums[nums.length / 2 - 1];
        var temp3: number = temp1 + temp2;
        var temp4: number = Math.trunc(temp3 / 2); //Math.round(temp3/2);
        this.medianValue = temp4;
      }
    }
    console.log('communication Meetings score calculation :' + this.medianValue);
    if (!isNaN(this.medianValue)) this.record.communicationMeetings = this.medianValue;
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
