import { TestBed } from '@angular/core/testing';

import { StudyTypeRedirectionService } from './study-type-redirection.service';

describe('StudyTypeRedirectionService', () => {
  let service: StudyTypeRedirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyTypeRedirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
