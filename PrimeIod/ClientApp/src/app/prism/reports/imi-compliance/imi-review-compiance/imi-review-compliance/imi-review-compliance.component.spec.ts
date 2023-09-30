import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewComplianceComponent } from './imi-review-compliance.component';

describe('ImiReviewComplianceComponent', () => {
  let component: ImiReviewComplianceComponent;
  let fixture: ComponentFixture<ImiReviewComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewComplianceComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
