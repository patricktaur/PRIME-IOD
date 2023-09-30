import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewCategoriesViewComponent } from './study-review-categories-view.component';

describe('StudyReviewCategoriesViewComponent', () => {
  let component: StudyReviewCategoriesViewComponent;
  let fixture: ComponentFixture<StudyReviewCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyReviewCategoriesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyReviewCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
