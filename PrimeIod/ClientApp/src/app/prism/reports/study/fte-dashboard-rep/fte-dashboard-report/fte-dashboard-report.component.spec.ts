import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FteDashboardReportComponent } from './fte-dashboard-report.component';

describe('FteDashboardReportComponent', () => {
  let component: FteDashboardReportComponent;
  let fixture: ComponentFixture<FteDashboardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FteDashboardReportComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FteDashboardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
