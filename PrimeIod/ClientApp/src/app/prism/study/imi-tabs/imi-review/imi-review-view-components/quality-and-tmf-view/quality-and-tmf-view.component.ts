import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quality-and-tmf-view',
  templateUrl: './quality-and-tmf-view.component.html',
  styleUrls: ['./quality-and-tmf-view.component.css']
})
export class QualityAndTmfViewComponent {
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
