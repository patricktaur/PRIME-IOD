import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewReportFiltersComponent } from './imi-review-report-filters.component';

describe('ImiReviewRepotFiltersComponent', () => {
  let component: ImiReviewReportFiltersComponent;
  let fixture: ComponentFixture<ImiReviewReportFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewReportFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewReportFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
