import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyReviewHistoryComponent } from './imi-study-review-history.component';

describe('ImiStudyReviewHistoryComponent', () => {
  let component: ImiStudyReviewHistoryComponent;
  let fixture: ComponentFixture<ImiStudyReviewHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyReviewHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyReviewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
