import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FteDashboardFiltersComponent } from './fte-dashboard-filters.component';

describe('FteDashboardFiltersComponent', () => {
  let component: FteDashboardFiltersComponent;
  let fixture: ComponentFixture<FteDashboardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FteDashboardFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FteDashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
