import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewViewComponent } from './imi-review-view.component';

describe('ImiReviewViewComponent', () => {
  let component: ImiReviewViewComponent;
  let fixture: ComponentFixture<ImiReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiReviewViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
