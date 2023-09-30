import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmProcImpTrackerReportComponent } from './dm-proc-imp-tracker-report.component';

describe('DmProcImpTrackerReportComponent', () => {
  let component: DmProcImpTrackerReportComponent;
  let fixture: ComponentFixture<DmProcImpTrackerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmProcImpTrackerReportComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmProcImpTrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
