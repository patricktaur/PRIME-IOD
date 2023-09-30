import { TestBed } from '@angular/core/testing';

import { CdsOutputTaskFilterService } from './cds-output-task-filter.service';

describe('CdsOutputTaskFilterService', () => {
  let service: CdsOutputTaskFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdsOutputTaskFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
