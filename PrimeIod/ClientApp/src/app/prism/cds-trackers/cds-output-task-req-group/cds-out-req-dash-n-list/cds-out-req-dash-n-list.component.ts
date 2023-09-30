import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { CdsPaginationAndFilters } from '@app/prism/shared-comps/filters/cds/cds-pagination-and-filters';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';
@Component({
  selector: 'app-cds-out-req-dash-n-list',
  templateUrl: './cds-out-req-dash-n-list.component.html',
  styleUrls: ['./cds-out-req-dash-n-list.component.css']
})
export class CdsOutReqDashNListComponent implements OnInit {
  dueType: string | any;
  item: any;
  filters: CdsOutputPaginationAndFilters = {
    pageNumber: 1,
    pageSize: 10,
    sortOn: 'task-id',
    sortBy: 'asc',
    searchText: '',
    searchOn: '',
    region: [],
    portfolio: [],
    cdms: [],
    dmpm: [],
    sponsor: [],
    requestor: [],
    programmerAssigned: [],
    programmingLead: [],
    taskCategory: [],
    taskSubCategory: [],
    dueDateFrom: null,
    dueDateTo: null,
    status: [],
    completed: 'no',
    dueType: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.dueType = params.dueType;
      this.filters.dueType = this.dueType;
    });
  }

  onItemClicked(item: any) {
    const dueType = item.tag + '-' + item.selectedItem.keyValue;
    this.filters.dueType = dueType;
    this.filters = { ...this.filters };
  }

  get title() {
    let retValue = '';

    switch (this.filters.dueType) {
      case 'all-overdue':
        retValue = 'All Output Tasks Due - Overdue';
        break;
      case 'all-dueToday':
        retValue = 'All Output Tasks Due - Due Today';
        break;
      case 'all-dueNextFive':
        retValue = 'All Output Tasks Due - Due in 5 days';
        break;
      case 'my-due-overdue':
        retValue = 'My Output Tasks - Overdue';
        break;
      case 'my-due-dueToday':
        retValue = 'My Output Tasks - My Due Today';
        break;
      case 'my-due-dueNextFive':
        retValue = 'My Output Tasks - Due in 5 days';
        break;
      case 'me-as-programmer-overdue':
        retValue = 'My Output Tasks due as Programmer Assigned -   Overdue';
        break;
      case 'me-as-programmer-dueToday':
        retValue = 'My Output Tasks due as Programmer Assigned - Due Today';
        break;
      case 'me-as-programmer-dueNextFive':
        retValue = 'My Output Tasks due as Programmer Assigned - Due in 5 days';
        break;
      default:
        retValue = '-----';
      // return predicate;
    }
    return retValue;
  }
}
