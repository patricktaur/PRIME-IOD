import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDownloadServerSideFiltersComponent } from './report-download-server-side-filters.component';

describe('ReportDownloadServerSideFiltersComponent', () => {
  let component: ReportDownloadServerSideFiltersComponent;
  let fixture: ComponentFixture<ReportDownloadServerSideFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDownloadServerSideFiltersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDownloadServerSideFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
