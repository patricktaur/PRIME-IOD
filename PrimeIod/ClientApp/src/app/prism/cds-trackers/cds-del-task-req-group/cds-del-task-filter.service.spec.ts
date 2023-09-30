import { TestBed } from '@angular/core/testing';

import { CdsDelTaskFilterService } from './cds-del-task-filter.service';

describe('CdsDelTaskFilterService', () => {
  let service: CdsDelTaskFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdsDelTaskFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
