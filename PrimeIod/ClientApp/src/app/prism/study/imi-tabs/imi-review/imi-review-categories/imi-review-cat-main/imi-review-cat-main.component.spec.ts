import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewCatMainComponent } from './imi-review-cat-main.component';

describe('ImiReviewCatMainComponent', () => {
  let component: ImiReviewCatMainComponent;
  let fixture: ComponentFixture<ImiReviewCatMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewCatMainComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewCatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
