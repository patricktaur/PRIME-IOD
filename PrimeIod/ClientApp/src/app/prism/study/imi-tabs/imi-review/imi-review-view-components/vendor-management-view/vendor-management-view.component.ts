import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vendor-management-view',
  templateUrl: './vendor-management-view.component.html',
  styleUrls: ['./vendor-management-view.component.css']
})
export class VendorManagementViewComponent {
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
