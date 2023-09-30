import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsTrackerViewComponent } from './study-cdms-tracker-view.component';

describe('StudyCdmsTrackerViewComponent', () => {
  let component: StudyCdmsTrackerViewComponent;
  let fixture: ComponentFixture<StudyCdmsTrackerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdmsTrackerViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdmsTrackerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
