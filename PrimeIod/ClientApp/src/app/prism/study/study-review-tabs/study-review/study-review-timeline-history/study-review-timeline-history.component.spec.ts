import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewTimelineHistoryComponent } from './study-review-timeline-history.component';

describe('StudyReviewTimelineHistoryComponent', () => {
  let component: StudyReviewTimelineHistoryComponent;
  let fixture: ComponentFixture<StudyReviewTimelineHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyReviewTimelineHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewTimelineHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
