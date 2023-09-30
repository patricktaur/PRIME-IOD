import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewFilterComponent } from './study-review-filter.component';

describe('StudyReviewFilterComponent', () => {
  let component: StudyReviewFilterComponent;
  let fixture: ComponentFixture<StudyReviewFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyReviewFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
