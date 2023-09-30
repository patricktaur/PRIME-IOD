import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cross-functional-view',
  templateUrl: './cross-functional-view.component.html',
  styleUrls: ['./cross-functional-view.component.css']
})
export class CrossFunctionalViewComponent {
  @Input() record: any = {};
  medianValue: number = 0;
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
