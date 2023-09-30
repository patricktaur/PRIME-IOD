import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-read-mang-maint-view',
  templateUrl: './img-read-mang-maint-view.component.html',
  styleUrls: ['./img-read-mang-maint-view.component.css']
})
export class ImgReadMangMaintViewComponent {
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
