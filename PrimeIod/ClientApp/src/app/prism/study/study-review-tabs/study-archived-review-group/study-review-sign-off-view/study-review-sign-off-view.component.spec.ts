import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewSignOffViewComponent } from './study-review-sign-off-view.component';

describe('StudyReviewSignOffViewComponent', () => {
  let component: StudyReviewSignOffViewComponent;
  let fixture: ComponentFixture<StudyReviewSignOffViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyReviewSignOffViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewSignOffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
