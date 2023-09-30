import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationControlsService {
  pageNumber = 1;
  pageSize = 10;
  constructor() {}
}
