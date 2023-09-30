import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssueTrackerContainerComponent } from './project-issue-tracker-container.component';

describe('ProjectIssueTrackerContainerComponent', () => {
  let component: ProjectIssueTrackerContainerComponent;
  let fixture: ComponentFixture<ProjectIssueTrackerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectIssueTrackerContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIssueTrackerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
