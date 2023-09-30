import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImprovementTrackerHistoryComponent } from './process-improvement-tracker-history.component';

describe('ProcessImprovementTrackerHistoryComponent', () => {
  let component: ProcessImprovementTrackerHistoryComponent;
  let fixture: ComponentFixture<ProcessImprovementTrackerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessImprovementTrackerHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessImprovementTrackerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
