import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewHistoryComponent } from './study-review-history.component';

describe('StudyReviewHistoryComponent', () => {
  let component: StudyReviewHistoryComponent;
  let fixture: ComponentFixture<StudyReviewHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyReviewHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
