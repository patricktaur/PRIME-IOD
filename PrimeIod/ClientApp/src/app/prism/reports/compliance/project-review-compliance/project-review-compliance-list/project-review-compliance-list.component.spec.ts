import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReviewComplianceListComponent } from './project-review-compliance-list.component';

describe('ProjectReviewComplianceListComponent', () => {
  let component: ProjectReviewComplianceListComponent;
  let fixture: ComponentFixture<ProjectReviewComplianceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectReviewComplianceListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReviewComplianceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
