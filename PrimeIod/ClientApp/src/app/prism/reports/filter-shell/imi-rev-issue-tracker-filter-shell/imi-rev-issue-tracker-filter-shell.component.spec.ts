import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRevIssueTrackerFilterShellComponent } from './imi-rev-issue-tracker-filter-shell.component';

describe('ImiRevIssueTrackerFilterShellComponent', () => {
  let component: ImiRevIssueTrackerFilterShellComponent;
  let fixture: ComponentFixture<ImiRevIssueTrackerFilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRevIssueTrackerFilterShellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRevIssueTrackerFilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
