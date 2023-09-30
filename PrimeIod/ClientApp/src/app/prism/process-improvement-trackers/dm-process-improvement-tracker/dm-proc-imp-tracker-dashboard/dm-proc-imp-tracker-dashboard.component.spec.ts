import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmProcImpTrackerDashboardComponent } from './dm-proc-imp-tracker-dashboard.component';

describe('DmProcImpTrackerDashboardComponent', () => {
  let component: DmProcImpTrackerDashboardComponent;
  let fixture: ComponentFixture<DmProcImpTrackerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmProcImpTrackerDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmProcImpTrackerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
