import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewCategoriesCodelistFilterComponent } from './imi-review-categories-codelist-filter.component';

describe('ImiReviewCategoriesCodelistFilterComponent', () => {
  let component: ImiReviewCategoriesCodelistFilterComponent;
  let fixture: ComponentFixture<ImiReviewCategoriesCodelistFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiReviewCategoriesCodelistFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiReviewCategoriesCodelistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
