import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-offline-validations-list',
  templateUrl: './offline-validations-list.component.html',
  styleUrls: ['./offline-validations-list.component.css']
})
export class OfflineValidationsListComponent implements OnInit {
  @Input() records: any[] = [];
  @Input() searchTerm: any;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  constructor() {}

  ngOnInit(): void {}

  offlineValidationColumns: Array<any> = [
    {
      header: 'ICON Number',
      field: 'studyIconNumber'
    },
    {
      header: 'Study Name',
      field: 'studyName'
    },
    {
      header: 'Offline Checks Firing',
      field: 'offlineValiationLogic'
    },
    {
      header: 'Comments',
      field: 'comment'
    }
  ];

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }
}
