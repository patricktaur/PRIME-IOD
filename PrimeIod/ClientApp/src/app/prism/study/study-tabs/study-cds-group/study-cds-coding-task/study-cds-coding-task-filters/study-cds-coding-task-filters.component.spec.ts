import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsCodingTaskFiltersComponent } from './study-cds-coding-task-filters.component';

describe('StudyCdsCodingTaskFiltersComponent', () => {
  let component: StudyCdsCodingTaskFiltersComponent;
  let fixture: ComponentFixture<StudyCdsCodingTaskFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsCodingTaskFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsCodingTaskFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
