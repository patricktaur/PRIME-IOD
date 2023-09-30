import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyArchivedReviewHistoryComponent } from './study-archived-review-history.component';

describe('StudyArchivedReviewHistoryComponent', () => {
  let component: StudyArchivedReviewHistoryComponent;
  let fixture: ComponentFixture<StudyArchivedReviewHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyArchivedReviewHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyArchivedReviewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
