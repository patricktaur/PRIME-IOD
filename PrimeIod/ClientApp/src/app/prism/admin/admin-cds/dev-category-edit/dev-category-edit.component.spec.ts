import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCategoryEditComponent } from './dev-category-edit.component';

describe('DevCategoryEditComponent', () => {
  let component: DevCategoryEditComponent;
  let fixture: ComponentFixture<DevCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevCategoryEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
