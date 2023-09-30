export interface CdsInstrPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  sortOn: string;
  sortBy: string; //asc / desc
  searchOn: string;
  searchText: string;
  region: string[];
  portfolio: string[];
  cdms: string[];
  dmpm: string[];
  sponsor: [];
  requestor: string[];
  cdp: string[];
  cdpl: string[];
  taskCategory: string[];
  // dueDateFrom: Date;
  // dueDateTo: Date;
  // status: string[];
  // completed: string;
}
