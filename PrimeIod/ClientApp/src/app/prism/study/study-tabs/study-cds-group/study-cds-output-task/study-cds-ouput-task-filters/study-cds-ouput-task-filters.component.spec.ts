import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsOuputTaskFiltersComponent } from './study-cds-ouput-task-filters.component';

describe('StudyCdsOuputTaskFiltersComponent', () => {
  let component: StudyCdsOuputTaskFiltersComponent;
  let fixture: ComponentFixture<StudyCdsOuputTaskFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsOuputTaskFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsOuputTaskFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
