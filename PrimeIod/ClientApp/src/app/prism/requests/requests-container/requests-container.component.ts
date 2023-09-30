import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests-container',
  templateUrl: './requests-container.component.html',
  styleUrls: ['./requests-container.component.css']
})
export class RequestsContainerComponent implements OnInit {
  rootPath = 'requests';
  menuWidth = 3;
  constructor() {}

  ngOnInit(): void {}

  menuClass() {
    if (this.menuWidth == 3) {
      return `col-3 px-0 position-relative`;
    } else {
      return `col-1 px-0 overflow-hidden text-truncate text-nowrap position-relative`;
    }
    //return `col-${this.menuWidth} pe-0`; //"col-1 pe-0";
  }
  toggleMenuWidth() {
    if (this.menuWidth == 3) {
      this.menuWidth = 1;
    } else {
      this.menuWidth = 3;
    }
  }
  //overflow-hidden text-truncate text-nowrap
  collapse() {
    if (this.menuWidth == 3) {
      return 'bi bi-arrow-bar-left';
    } else {
      return 'bi bi-arrow-bar-right';
    }
  }
}
