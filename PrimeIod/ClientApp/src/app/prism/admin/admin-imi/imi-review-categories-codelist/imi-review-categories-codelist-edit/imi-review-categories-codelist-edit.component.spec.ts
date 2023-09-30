import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewCategoriesCodelistEditComponent } from './imi-review-categories-codelist-edit.component';

describe('ImiReviewCategoriesCodelistEditComponent', () => {
  let component: ImiReviewCategoriesCodelistEditComponent;
  let fixture: ComponentFixture<ImiReviewCategoriesCodelistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiReviewCategoriesCodelistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiReviewCategoriesCodelistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
