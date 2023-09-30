import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imi-proj-rev-comp-list',
  templateUrl: './imi-proj-rev-comp-list.component.html',
  styleUrls: ['./imi-proj-rev-comp-list.component.css']
})
export class ImiProjRevCompListComponent implements OnInit {
  @Input() records: any[] = [];
  @Input() searchTerm: any;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  constructor() {}

  ngOnInit(): void {}

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }
}
