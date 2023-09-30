import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQualityReviewRequiredViewComponent } from './study-quality-review-required-view.component';

describe('StudyQualityReviewRequiredViewComponent', () => {
  let component: StudyQualityReviewRequiredViewComponent;
  let fixture: ComponentFixture<StudyQualityReviewRequiredViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyQualityReviewRequiredViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQualityReviewRequiredViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
