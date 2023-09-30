export interface CdsDevpPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  searchOn: string;
  sortOn: string;
  sortBy: string; //asc / desc

  searchText: string;
  // textSearchField: string;
  // textSearch: string;
  region: string[] | any;
  portfolio: string[] | any;
  sponsor: string[] | any;
  cdms: string[] | any;
  dmpm: string[] | any;
  requestor: string[] | any;
  cDSAssignedTo: string[] | any;
  clinicalDataDeliveryLead: string[] | any;
  validationProgrammer: string[] | any;
  taskCategory: string[] | any;
  taskSubCategory: string[] | any;
  dueDateFrom: Date | null;
  dueDateTo: Date | null;
  status: string[] | any;
  priority: string;
  completed: string;

  type: string;
}

function InitPaginationAndCdsDevpFilters(options?: Partial<CdsDevpPaginationAndFilters>): CdsDevpPaginationAndFilters {
  const defaults = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: '',
    searchText: '',
    sortOn: '',
    sortBy: 'asc',
    region: [''],
    portfolio: [''],
    sponsor: [''],
    cdms: [''],
    dmpm: [''],
    requestor: [''],
    cDSAssignedTo: [''],
    clinicalDataDeliveryLead: [''],
    validationProgrammer: [''],
    taskCategory: [''],
    taskSubCategory: [''],
    dueDateFrom: new Date(),
    dueDateTo: new Date(),
    status: [''],
    priority: 'no',
    completed: 'no',
    type: 'all'
  };

  return {
    ...defaults,
    ...options
  };
}
