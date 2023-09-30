import { TestBed } from '@angular/core/testing';

import { StudyCdsOutputFilterService } from './study-cds-output-filter.service';

describe('StudyCdsOutputFilterService', () => {
  let service: StudyCdsOutputFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCdsOutputFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
