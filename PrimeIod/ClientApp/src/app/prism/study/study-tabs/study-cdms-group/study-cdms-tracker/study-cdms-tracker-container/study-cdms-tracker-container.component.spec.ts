import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsTrackerContainerComponent } from './study-cdms-tracker-container.component';

describe('StudyCdmsTrackerContainerComponent', () => {
  let component: StudyCdmsTrackerContainerComponent;
  let fixture: ComponentFixture<StudyCdmsTrackerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdmsTrackerContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdmsTrackerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
