import { TestBed } from '@angular/core/testing';

import { AppAdminService } from './app-admin.service';

describe('AppAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppAdminService = TestBed.get(AppAdminService);
    expect(service).toBeTruthy();
  });
});
