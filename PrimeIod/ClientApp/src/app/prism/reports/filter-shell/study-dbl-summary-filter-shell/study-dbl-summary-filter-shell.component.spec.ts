import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDblSummaryFilterShellComponent } from './study-dbl-summary-filter-shell.component';

describe('StudyDblSummaryFilterShellComponent', () => {
  let component: StudyDblSummaryFilterShellComponent;
  let fixture: ComponentFixture<StudyDblSummaryFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyDblSummaryFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDblSummaryFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
