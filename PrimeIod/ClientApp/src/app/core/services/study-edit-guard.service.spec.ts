import { TestBed } from '@angular/core/testing';

import { StudyEditGuard } from './study-edit-guard.service';

describe('StudyEditGuardService', () => {
  let service: StudyEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyEditGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
