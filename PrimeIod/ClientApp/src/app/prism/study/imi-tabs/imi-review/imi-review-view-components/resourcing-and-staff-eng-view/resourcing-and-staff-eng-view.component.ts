import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resourcing-and-staff-eng-view',
  templateUrl: './resourcing-and-staff-eng-view.component.html',
  styleUrls: ['./resourcing-and-staff-eng-view.component.css']
})
export class ResourcingAndStaffEngViewComponent {
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
