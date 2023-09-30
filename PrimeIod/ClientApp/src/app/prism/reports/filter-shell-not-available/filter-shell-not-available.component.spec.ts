import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShellNotAvailableComponent } from './filter-shell-not-available.component';

describe('FilterShellNotAvailableComponent', () => {
  let component: FilterShellNotAvailableComponent;
  let fixture: ComponentFixture<FilterShellNotAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterShellNotAvailableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShellNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
