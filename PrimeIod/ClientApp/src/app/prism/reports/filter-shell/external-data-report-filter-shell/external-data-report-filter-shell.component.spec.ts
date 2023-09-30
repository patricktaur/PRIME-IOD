import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDataReportFilterShellComponent } from './external-data-report-filter-shell.component';

describe('ExternalDataReportFilterShellComponent', () => {
  let component: ExternalDataReportFilterShellComponent;
  let fixture: ComponentFixture<ExternalDataReportFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalDataReportFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDataReportFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
