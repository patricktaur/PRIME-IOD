import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewContainerComponent } from './study-review-container.component';

describe('StudyReviewGroupComponent', () => {
  let component: StudyReviewContainerComponent;
  let fixture: ComponentFixture<StudyReviewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyReviewContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
