import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDataReportFilterComponent } from './external-data-report-filter.component';

describe('ExternalDataReportFilterComponent', () => {
  let component: ExternalDataReportFilterComponent;
  let fixture: ComponentFixture<ExternalDataReportFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalDataReportFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDataReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
