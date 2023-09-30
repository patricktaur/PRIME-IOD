import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewActionsViewComponent } from './study-review-actions-view.component';

describe('StudyReviewActionsViewComponent', () => {
  let component: StudyReviewActionsViewComponent;
  let fixture: ComponentFixture<StudyReviewActionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyReviewActionsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyReviewActionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
