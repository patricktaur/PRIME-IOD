import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsValTaskFiltersComponent } from './study-cds-val-task-filters.component';

describe('StudyCdsValTaskFiltersComponent', () => {
  let component: StudyCdsValTaskFiltersComponent;
  let fixture: ComponentFixture<StudyCdsValTaskFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsValTaskFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsValTaskFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
