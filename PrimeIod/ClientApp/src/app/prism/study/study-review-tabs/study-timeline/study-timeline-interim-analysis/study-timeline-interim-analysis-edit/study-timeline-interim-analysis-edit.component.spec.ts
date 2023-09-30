import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineInterimAnalysisEditComponent } from './study-timeline-interim-analysis-edit.component';

describe('StudyTimelineInterimAnalysisEditComponent', () => {
  let component: StudyTimelineInterimAnalysisEditComponent;
  let fixture: ComponentFixture<StudyTimelineInterimAnalysisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineInterimAnalysisEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineInterimAnalysisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
