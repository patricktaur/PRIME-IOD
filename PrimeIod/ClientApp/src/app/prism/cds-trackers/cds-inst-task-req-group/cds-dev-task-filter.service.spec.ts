import { TestBed } from '@angular/core/testing';

import { CdsInstTaskFilterService } from './cds-inst-task-filter.service';

describe('CdsDevTaskFilterService', () => {
  let service: CdsInstTaskFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdsInstTaskFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
