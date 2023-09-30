import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edc-doc-and-dev-view',
  templateUrl: './edc-doc-and-dev-view.component.html',
  styleUrls: ['./edc-doc-and-dev-view.component.css']
})
export class EdcDocAndDevViewComponent {
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
