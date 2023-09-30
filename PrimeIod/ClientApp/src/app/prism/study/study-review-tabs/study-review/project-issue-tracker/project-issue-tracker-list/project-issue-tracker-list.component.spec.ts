import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssueTrackerListComponent } from './project-issue-tracker-list.component';

describe('ProjectIssueTrackerListComponent', () => {
  let component: ProjectIssueTrackerListComponent;
  let fixture: ComponentFixture<ProjectIssueTrackerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectIssueTrackerListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIssueTrackerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
