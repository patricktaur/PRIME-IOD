import { TestBed } from '@angular/core/testing';

import { StudyCdsInstFilterService } from './study-cds-inst-filter.service';

describe('StudyCdsInstFilterService', () => {
  let service: StudyCdsInstFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCdsInstFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
