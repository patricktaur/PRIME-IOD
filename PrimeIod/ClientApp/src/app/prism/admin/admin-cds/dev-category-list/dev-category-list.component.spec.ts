import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCategoryListComponent } from './dev-category-list.component';

describe('DevCategoryListComponent', () => {
  let component: DevCategoryListComponent;
  let fixture: ComponentFixture<DevCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevCategoryListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
