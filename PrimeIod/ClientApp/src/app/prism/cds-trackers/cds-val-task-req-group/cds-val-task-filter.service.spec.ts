import { TestBed } from '@angular/core/testing';

import { CdsValTaskFilterService } from './cds-val-task-filter.service';

describe('CdsValTaskFilterService', () => {
  let service: CdsValTaskFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdsValTaskFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
