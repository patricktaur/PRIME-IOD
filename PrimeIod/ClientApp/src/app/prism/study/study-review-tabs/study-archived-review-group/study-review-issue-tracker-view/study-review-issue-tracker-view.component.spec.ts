import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewIssueTrackerViewComponent } from './study-review-issue-tracker-view.component';

describe('StudyReviewIssueTrackerViewComponent', () => {
  let component: StudyReviewIssueTrackerViewComponent;
  let fixture: ComponentFixture<StudyReviewIssueTrackerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyReviewIssueTrackerViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewIssueTrackerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
