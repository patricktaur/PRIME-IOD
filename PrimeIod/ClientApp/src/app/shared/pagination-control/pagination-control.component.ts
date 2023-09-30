import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.css']
})
export class PaginationControlComponent implements OnInit {
  @Input() page = 1;
  @Input() pageSize = 2;
  @Input() collectionSize = 0;
  @Output() onPageChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChangePageOptions() {
    console.log(`page = ${this.page}`);
    console.log(`PageSize = ${this.pageSize}`);
    this.onPageChange.emit({
      page: this.page,
      pageSize: this.pageSize,
      collectionSize: this.collectionSize
    });
  }
}
