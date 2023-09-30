import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiReviewCategoriesCodelistListComponent } from './imi-review-categories-codelist-list.component';

describe('ImiReviewCategoriesCodelistListComponent', () => {
  let component: ImiReviewCategoriesCodelistListComponent;
  let fixture: ComponentFixture<ImiReviewCategoriesCodelistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiReviewCategoriesCodelistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiReviewCategoriesCodelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
