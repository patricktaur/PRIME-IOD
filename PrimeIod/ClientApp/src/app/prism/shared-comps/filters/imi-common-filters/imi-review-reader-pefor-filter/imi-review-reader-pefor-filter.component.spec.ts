import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewReaderPeforFilterComponent } from './imi-review-reader-pefor-filter.component';

describe('ImiReviewReaderPeforFilterComponent', () => {
  let component: ImiReviewReaderPeforFilterComponent;
  let fixture: ComponentFixture<ImiReviewReaderPeforFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiReviewReaderPeforFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiReviewReaderPeforFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
