import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDblSummaryFilterComponent } from './study-dbl-summary-filter.component';

describe('StudyDblSummaryFilterComponent', () => {
  let component: StudyDblSummaryFilterComponent;
  let fixture: ComponentFixture<StudyDblSummaryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDblSummaryFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDblSummaryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
