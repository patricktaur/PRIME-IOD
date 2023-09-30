import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewActionsComponent } from './study-review-actions.component';

describe('StudyReviewActionsComponent', () => {
  let component: StudyReviewActionsComponent;
  let fixture: ComponentFixture<StudyReviewActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyReviewActionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
