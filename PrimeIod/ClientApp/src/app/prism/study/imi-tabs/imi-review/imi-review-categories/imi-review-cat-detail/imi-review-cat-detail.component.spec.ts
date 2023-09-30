import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewCatDetailComponent } from './imi-review-cat-detail.component';

describe('ImiReviewCatDetailComponent', () => {
  let component: ImiReviewCatDetailComponent;
  let fixture: ComponentFixture<ImiReviewCatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewCatDetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewCatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
