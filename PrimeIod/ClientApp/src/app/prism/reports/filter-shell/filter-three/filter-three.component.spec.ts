import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterThreeComponent } from './filter-three.component';

describe('FilterThreeComponent', () => {
  let component: FilterThreeComponent;
  let fixture: ComponentFixture<FilterThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterThreeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
