import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImprovementTrackerViewComponent } from './process-improvement-tracker-view.component';

describe('ProcessImprovementTrackerViewComponent', () => {
  let component: ProcessImprovementTrackerViewComponent;
  let fixture: ComponentFixture<ProcessImprovementTrackerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessImprovementTrackerViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessImprovementTrackerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
