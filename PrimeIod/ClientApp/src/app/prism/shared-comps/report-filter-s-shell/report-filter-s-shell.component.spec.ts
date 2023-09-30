import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFilterSShellComponent } from './report-filter-s-shell.component';

describe('ReportFilterSShellComponent', () => {
  let component: ReportFilterSShellComponent;
  let fixture: ComponentFixture<ReportFilterSShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportFilterSShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFilterSShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
