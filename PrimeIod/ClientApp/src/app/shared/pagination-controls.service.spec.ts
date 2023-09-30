import { TestBed } from '@angular/core/testing';

import { PaginationControlsService } from './pagination-controls.service';

describe('PaginationControlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginationControlsService = TestBed.get(PaginationControlsService);
    expect(service).toBeTruthy();
  });
});
