import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportServerSideFilterNPaginationComponent } from './report-server-side-filter-n-pagination.component';

describe('ReportServerSideFilterNPaginationComponent', () => {
  let component: ReportServerSideFilterNPaginationComponent;
  let fixture: ComponentFixture<ReportServerSideFilterNPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportServerSideFilterNPaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportServerSideFilterNPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
