import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reader-training-view',
  templateUrl: './reader-training-view.component.html',
  styleUrls: ['./reader-training-view.component.css']
})
export class ReaderTrainingViewComponent {
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
