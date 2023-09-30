import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyReviewReportComponent } from './imi-study-review-report.component';

describe('ImiStudyReviewReportComponent', () => {
  let component: ImiStudyReviewReportComponent;
  let fixture: ComponentFixture<ImiStudyReviewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyReviewReportComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
