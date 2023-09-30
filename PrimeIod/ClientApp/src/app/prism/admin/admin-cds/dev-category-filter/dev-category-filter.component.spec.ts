import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCategoryFilterComponent } from './dev-category-filter.component';

describe('DevCategoryFilterComponent', () => {
  let component: DevCategoryFilterComponent;
  let fixture: ComponentFixture<DevCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevCategoryFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
