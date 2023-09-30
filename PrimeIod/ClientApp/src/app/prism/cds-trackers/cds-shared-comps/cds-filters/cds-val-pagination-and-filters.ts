export interface CdsValPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  sortOn: string;
  sortBy: string; //asc / desc
  searchOn: string;
  searchText: string;
  // textSearchField: string;
  // textSearch: string;
  region: string[];
  portfolio: string[];
  cdms: string[];
  dmpm: string[];
  sponsor: [];
  requestor: string[];

  validationStatus: string[];
  validationPoc: string[];
  validationMembers: string[];
  developmentTaskCategory: string[];

  developmentStatus: string[];

  dueDateFrom: Date | null;
  dueDateTo: Date | null;

  status: string[];
  completed: string;
  dueType: string;
}
