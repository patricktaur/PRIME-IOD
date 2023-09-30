import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmProcImpTrackerFiltersComponent } from './dm-proc-imp-tracker-filters.component';

describe('DmProcImpTrackerFiltersComponent', () => {
  let component: DmProcImpTrackerFiltersComponent;
  let fixture: ComponentFixture<DmProcImpTrackerFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmProcImpTrackerFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmProcImpTrackerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
