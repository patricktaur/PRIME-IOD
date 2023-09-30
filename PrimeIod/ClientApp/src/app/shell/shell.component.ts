import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  menuWidth = 3;
  constructor() {}

  ngOnInit() {}

  menuClass() {
    if (this.menuWidth == 3) {
      return `col-md-3 sidebar position-relative`;
    } else {
      return `col-md-1 sidebar sidebar-collapsed text-truncate text-nowrap position-relative`;
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

  collapseExpand() {
    if (this.menuWidth == 3) {
      return 'card my-3 border-0 shadow-lg px-3 py-4 col-md-9 overflow-hidden';
    } else {
      return 'card my-3 border-0 shadow-lg px-3 py-4 col-md-11 overflow-hidden sidebar-collapsed';
    }
  }
}
