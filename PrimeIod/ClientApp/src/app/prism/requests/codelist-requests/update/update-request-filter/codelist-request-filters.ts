export interface CodelistRequestFilters {
  pageNumber: number;
  pageSize: number;
  iconNumberOrName: string;
  status: number[];
  requestedBy: number[];
  requestDateFrom: string;
  requestDateTo: string;
  isActioned: number[];
}
