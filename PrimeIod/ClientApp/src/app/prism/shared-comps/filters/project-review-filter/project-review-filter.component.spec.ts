import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReviewFilterComponent } from './project-review-filter.component';

describe('ProjectReviewFilterAComponent', () => {
  let component: ProjectReviewFilterComponent;
  let fixture: ComponentFixture<ProjectReviewFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectReviewFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReviewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
