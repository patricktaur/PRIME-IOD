import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFteReviewAveragesListComponent } from './study-fte-review-averages-list.component';

describe('StudyFteReviewAveragesListComponent', () => {
  let component: StudyFteReviewAveragesListComponent;
  let fixture: ComponentFixture<StudyFteReviewAveragesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyFteReviewAveragesListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFteReviewAveragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
