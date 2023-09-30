import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewComplianceFiltersComponent } from './imi-review-compliance-filters.component';

describe('ImiReviewComplianceFiltersComponent', () => {
  let component: ImiReviewComplianceFiltersComponent;
  let fixture: ComponentFixture<ImiReviewComplianceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewComplianceFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewComplianceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
