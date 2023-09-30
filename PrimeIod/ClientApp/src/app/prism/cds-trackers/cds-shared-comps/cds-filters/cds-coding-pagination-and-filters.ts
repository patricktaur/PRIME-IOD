export interface CdsCodingPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  sortOn: string;
  sortBy: string; //asc / desc
  searchOn: string;
  searchText: string;
  // textSearchField: string;
  // textSearch: string;
  region: string[] | any;
  portfolio: string[] | any;
  cdms: string[] | any;
  dmpm: string[] | any;
  sponsor: [];
  requestor: string[] | any;
  codingSpecialist: string[] | any;
  secondaryCodingSpecialist: string[] | any;

  // programmingLead: string[];
  taskCategory: string[] | any;
  taskSubCategory: string[];
  dueDateFrom: Date | null;
  dueDateTo: Date | null;
  status: string[] | any;
  completed: string;
  dueType: string;
}
