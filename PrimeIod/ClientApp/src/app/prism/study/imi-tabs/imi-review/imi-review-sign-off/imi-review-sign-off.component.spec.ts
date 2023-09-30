import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewSignOffComponent } from './imi-review-sign-off.component';

describe('ImiReviewSignOffComponent', () => {
  let component: ImiReviewSignOffComponent;
  let fixture: ComponentFixture<ImiReviewSignOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewSignOffComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewSignOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
