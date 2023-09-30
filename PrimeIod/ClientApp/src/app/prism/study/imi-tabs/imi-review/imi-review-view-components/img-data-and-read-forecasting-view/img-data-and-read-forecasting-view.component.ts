import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-data-and-read-forecasting-view',
  templateUrl: './img-data-and-read-forecasting-view.component.html',
  styleUrls: ['./img-data-and-read-forecasting-view.component.css']
})
export class ImgDataAndReadForecastingViewComponent {
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
