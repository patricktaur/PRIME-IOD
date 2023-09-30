import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReviewReportComponent } from './project-review-report.component';

describe('ProjectReviewReportComponent', () => {
  let component: ProjectReviewReportComponent;
  let fixture: ComponentFixture<ProjectReviewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectReviewReportComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
