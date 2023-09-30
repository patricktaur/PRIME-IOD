import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsDevelopmentTaskRequestsFiltersComponent } from './study-cds-development-task-requests-filters.component';

describe('StudyCdsDevelopmentTaskRequestsFiltersComponent', () => {
  let component: StudyCdsDevelopmentTaskRequestsFiltersComponent;
  let fixture: ComponentFixture<StudyCdsDevelopmentTaskRequestsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsDevelopmentTaskRequestsFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsDevelopmentTaskRequestsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
