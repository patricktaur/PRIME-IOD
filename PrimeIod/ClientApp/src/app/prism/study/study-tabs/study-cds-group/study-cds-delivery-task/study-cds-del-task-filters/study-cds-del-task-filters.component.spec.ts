import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsDelTaskFiltersComponent } from './study-cds-del-task-filters.component';

describe('StudyCdsDelTaskFiltersComponent', () => {
  let component: StudyCdsDelTaskFiltersComponent;
  let fixture: ComponentFixture<StudyCdsDelTaskFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsDelTaskFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsDelTaskFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
