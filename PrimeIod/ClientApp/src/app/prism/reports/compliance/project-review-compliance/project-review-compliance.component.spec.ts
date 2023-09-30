import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReviewComplianceComponent } from './project-review-compliance.component';

describe('ProjectReviewComplianceComponent', () => {
  let component: ProjectReviewComplianceComponent;
  let fixture: ComponentFixture<ProjectReviewComplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectReviewComplianceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReviewComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
