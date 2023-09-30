import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShellSNotAvailableComponent } from './filter-shell-s-not-available.component';

describe('FilterShellSNotAvailableComponent', () => {
  let component: FilterShellSNotAvailableComponent;
  let fixture: ComponentFixture<FilterShellSNotAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterShellSNotAvailableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShellSNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
