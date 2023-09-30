import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewCategoriesCodelistContainerComponent } from './imi-review-categories-codelist-container.component';

describe('ImiReviewCategoriesCodelistContainerComponent', () => {
  let component: ImiReviewCategoriesCodelistContainerComponent;
  let fixture: ComponentFixture<ImiReviewCategoriesCodelistContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiReviewCategoriesCodelistContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiReviewCategoriesCodelistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
