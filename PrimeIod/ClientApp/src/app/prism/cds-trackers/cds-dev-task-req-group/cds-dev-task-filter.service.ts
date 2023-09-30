import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

@Injectable({
  providedIn: 'root'
})
export class CdsDevTaskFilterService {
  filters: BehaviorSubject<CdsDevpPaginationAndFilters> = new BehaviorSubject(this.initialState);

  constructor() {}
  get initialState() {
    return <CdsDevpPaginationAndFilters> {
      pageNumber: 1,
      pageSize: 10,
      searchOn: 'icon-number',
      sortOn: 'icon-number-task-id',
      sortBy: 'asc',
      searchText: '',
      region: [],
      portfolio: [],
      sponsor: [],
      cdms: [],
      dmpm: [],
      requestor: [],
      cDSAssignedTo: [],
      clinicalDataDeliveryLead: [],
      taskCategory: [],
      taskSubCategory: [],
      dueDateFrom: null, //new Date('1-Jan-1753') ,
      dueDateTo: null, //new Date('1-Dec-9999'),
      status: [],
      priority: '',
      completed: '',
      type: ''
    };
  }

  setFilters(filters: CdsDevpPaginationAndFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }

  getDefaultFilters() {
    return this.initialState;
  }
}