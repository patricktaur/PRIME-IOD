import { TestBed } from '@angular/core/testing';

import { StudyFiltersService } from './study-filters.service';

describe('StudyFiltersService', () => {
  let service: StudyFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
