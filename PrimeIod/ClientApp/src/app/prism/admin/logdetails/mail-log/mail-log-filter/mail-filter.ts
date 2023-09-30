export interface mailFilters {
  pageNumber: number;
  pageSize: number;
  emailAddress: string;
  fromDate: Date | null;
  toDate: Date | null;
  isSuccessfull: boolean | null;
}
