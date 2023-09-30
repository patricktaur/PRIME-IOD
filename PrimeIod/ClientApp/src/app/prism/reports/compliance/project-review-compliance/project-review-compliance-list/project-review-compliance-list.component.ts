import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-project-review-compliance-list',
  templateUrl: './project-review-compliance-list.component.html',
  styleUrls: ['./project-review-compliance-list.component.css']
})
export class ProjectReviewComplianceListComponent implements OnInit {
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
