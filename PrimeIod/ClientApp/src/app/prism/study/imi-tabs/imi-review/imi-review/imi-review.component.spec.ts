import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewComponent } from './imi-review.component';

describe('ImiReviewComponent', () => {
  let component: ImiReviewComponent;
  let fixture: ComponentFixture<ImiReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
