import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewSignOffViewComponent } from './imi-review-sign-off-view.component';

describe('ImiReviewSignOffViewComponent', () => {
  let component: ImiReviewSignOffViewComponent;
  let fixture: ComponentFixture<ImiReviewSignOffViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiReviewSignOffViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiReviewSignOffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
