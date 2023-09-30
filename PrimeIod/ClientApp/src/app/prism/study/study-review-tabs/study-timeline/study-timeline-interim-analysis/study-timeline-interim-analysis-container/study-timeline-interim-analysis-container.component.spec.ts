import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimelineInterimAnalysisContainerComponent } from './study-timeline-interim-analysis-container.component';

describe('StudyTimelineInterimAnalysisContainerComponent', () => {
  let component: StudyTimelineInterimAnalysisContainerComponent;
  let fixture: ComponentFixture<StudyTimelineInterimAnalysisContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTimelineInterimAnalysisContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimelineInterimAnalysisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
