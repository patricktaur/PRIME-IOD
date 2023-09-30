import { TestBed } from '@angular/core/testing';

import { StudyCdsDelFilterService } from './study-cds-del-filter.service';

describe('StudyCdsDelFilterService', () => {
  let service: StudyCdsDelFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCdsDelFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
