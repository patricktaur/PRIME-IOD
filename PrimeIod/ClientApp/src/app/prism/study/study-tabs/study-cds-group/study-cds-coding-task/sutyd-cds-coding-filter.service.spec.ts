import { TestBed } from '@angular/core/testing';

import { StudyCdsCodingFilterService } from './sutyd-cds-coding-filter.service';

describe('SutydCdsCodingFilterService', () => {
  let service: StudyCdsCodingFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCdsCodingFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
