import { TestBed } from '@angular/core/testing';

import { StudyTypeGuard } from './study-type.guard';

describe('StudyTypeGuard', () => {
  let guard: StudyTypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudyTypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
