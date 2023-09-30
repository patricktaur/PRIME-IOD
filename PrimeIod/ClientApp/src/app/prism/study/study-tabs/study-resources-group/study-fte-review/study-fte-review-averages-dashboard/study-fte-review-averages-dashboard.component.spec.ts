import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFteReviewAveragesDashboardComponent } from './study-fte-review-averages-dashboard.component';

describe('StudyFteReviewAveragesDashboardComponent', () => {
  let component: StudyFteReviewAveragesDashboardComponent;
  let fixture: ComponentFixture<StudyFteReviewAveragesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyFteReviewAveragesDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFteReviewAveragesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
