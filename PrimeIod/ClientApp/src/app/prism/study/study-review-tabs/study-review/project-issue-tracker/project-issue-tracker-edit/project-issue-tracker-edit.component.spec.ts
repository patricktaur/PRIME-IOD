import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssueTrackerEditComponent } from './project-issue-tracker-edit.component';

describe('ProjectIssueTrackerEditComponent', () => {
  let component: ProjectIssueTrackerEditComponent;
  let fixture: ComponentFixture<ProjectIssueTrackerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectIssueTrackerEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIssueTrackerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
