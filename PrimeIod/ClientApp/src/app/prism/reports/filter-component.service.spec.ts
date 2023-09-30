import { TestBed } from '@angular/core/testing';

import { FilterComponentService } from './filter-component.service';

describe('FilterComponentService', () => {
  let service: FilterComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
