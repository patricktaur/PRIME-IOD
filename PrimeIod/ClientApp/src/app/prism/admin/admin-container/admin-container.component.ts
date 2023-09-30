import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})
export class AdminContainerComponent implements OnInit {
  menuWidth = 3;
  rootPath = "admin";
  
  constructor() {}

  ngOnInit(): void {}

  menuClass() {
    // if (this.menuWidth == 3) {
    //   return `col-3 pe-0`;
    // } else {
    //   return `col-1 pe-0 overflow-hidden text-truncate text-nowrap`;
    // }

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
