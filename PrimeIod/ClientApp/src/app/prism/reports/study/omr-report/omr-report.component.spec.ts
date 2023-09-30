import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmrReportComponent } from './omr-report.component';

describe('OmrReportComponent', () => {
  let component: OmrReportComponent;
  let fixture: ComponentFixture<OmrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OmrReportComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
