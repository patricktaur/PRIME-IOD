import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineInterimAnalysisListComponent } from './study-timeline-interim-analysis-list.component';

describe('StudyTimelineInterimAnalysisListComponent', () => {
  let component: StudyTimelineInterimAnalysisListComponent;
  let fixture: ComponentFixture<StudyTimelineInterimAnalysisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineInterimAnalysisListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineInterimAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
