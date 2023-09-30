import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsInstTaskFiltersComponent } from './study-cds-inst-task-filters.component';

describe('StudyCdsInstTaskFiltersComponent', () => {
  let component: StudyCdsInstTaskFiltersComponent;
  let fixture: ComponentFixture<StudyCdsInstTaskFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsInstTaskFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsInstTaskFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
