import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRevIssueTrackerFilterComponent } from './imi-rev-issue-tracker-filter.component';

describe('ImiRevIssueTrackerFilterComponent', () => {
  let component: ImiRevIssueTrackerFilterComponent;
  let fixture: ComponentFixture<ImiRevIssueTrackerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRevIssueTrackerFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRevIssueTrackerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
