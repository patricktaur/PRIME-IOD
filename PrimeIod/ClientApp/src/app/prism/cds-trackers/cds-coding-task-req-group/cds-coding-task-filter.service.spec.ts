import { TestBed } from '@angular/core/testing';

import { CdsCodingTaskFilterService } from './cds-coding-task-filter.service';

describe('CdsCodingTaskFilterService', () => {
  let service: CdsCodingTaskFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdsCodingTaskFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
