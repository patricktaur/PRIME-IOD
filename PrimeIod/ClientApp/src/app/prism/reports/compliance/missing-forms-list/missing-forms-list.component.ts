import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-missing-forms-list',
  templateUrl: './missing-forms-list.component.html',
  styleUrls: ['./missing-forms-list.component.css']
})
export class MissingFormsListComponent implements OnInit {
  @Input() records: any[] = [];
  @Input() searchTerm: any;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  constructor() {}

  ngOnInit(): void {}

  missingFormColumns: Array<any> = [
    {
      header: 'ICON Number',
      field: 'studyIconNumber'
    },
    {
      header: 'Study Name',
      field: 'studyName'
    },
    {
      header: 'Empty Forms',
      field: 'emptyForms'
    }
  ];

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }
}
