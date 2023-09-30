import { TestBed } from '@angular/core/testing';

import { StudyCdsValFilterService } from './study-cds-val-filter.service';

describe('StudyCdsValFilterService', () => {
  let service: StudyCdsValFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyCdsValFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
