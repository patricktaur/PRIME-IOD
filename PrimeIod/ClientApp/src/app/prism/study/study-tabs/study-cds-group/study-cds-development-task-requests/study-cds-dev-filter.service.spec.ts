import { TestBed } from '@angular/core/testing';

import { StudyCdsDevFilterService } from './study-cds-dev-filter.service';

describe('StudyCdsDevFilterService', () => {
  let service: StudyCdsDevFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCdsDevFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
