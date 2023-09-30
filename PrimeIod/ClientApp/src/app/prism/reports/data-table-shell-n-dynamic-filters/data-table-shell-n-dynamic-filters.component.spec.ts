import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableShellNDynamicFiltersComponent } from './data-table-shell-n-dynamic-filters.component';

describe('DataTableShellNDynamicFiltersComponent', () => {
  let component: DataTableShellNDynamicFiltersComponent;
  let fixture: ComponentFixture<DataTableShellNDynamicFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableShellNDynamicFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableShellNDynamicFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
